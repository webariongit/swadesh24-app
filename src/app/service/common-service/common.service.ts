import { EventEmitter, Injectable, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userProfileDetail:any;
  @Output() userLoggedIn: EventEmitter<any> = new EventEmitter();
  @Output() userLoggedOut: EventEmitter<any> = new EventEmitter();
  @Output() networkConnection: EventEmitter<any> = new EventEmitter();
  @Output() selectedCountry: EventEmitter<any> = new EventEmitter();
  @Output() selectedState: EventEmitter<any> = new EventEmitter();
  @Output() categories: EventEmitter<any> = new EventEmitter();
  @Output() updateStoryList: EventEmitter<any> = new EventEmitter();

  isOnline:boolean = false;

  constructor(
    private toastController:ToastController
  ) { }

  setUserToken(userToken:any) {
    localStorage.setItem('token', userToken);
  }

  getUserToken() {
    let userToken = localStorage.getItem('token');
    return userToken;
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  setUserDetail(userDetail:any) {
    localStorage.setItem('userDetails', JSON.stringify(userDetail))
    this.userProfileDetail = userDetail;
  }

  getUserDetail() {
    return this.userProfileDetail;
  }

  async presentSuccessToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      cssClass:'successToast',
      icon:"checkmark"
    });

    await toast.present();
  }

  async presentFailureToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      cssClass:'failureToast',
      icon:"close"
    });

    await toast.present();
  }

}
