import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HttpService } from './service/http-service/http.service';
import { CommonService } from './service/common-service/common.service';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userDetails:any;
  isUserLoggedIn:boolean;

  public appPages = [
    { title: 'Home', url: '/home/all', icon: 'home' },
    { title: 'Stories', url: '/stories', icon: 'play' },
    { title: 'My Profile', url: '/my-profile/edit', icon: 'person' },
    { title: 'My Personal Information', url: '/personal-information/0', icon: 'man' },
    { title: 'Hastags', url: '/hastags', icon: 'extension-puzzle' },
    { title: 'Bookmarks', url: '/bookmarks', icon: 'bookmark' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];
  constructor(
    private httpService:HttpService,
    private commonService:CommonService,
    private platform:Platform,
    private _location: Location,
    private alertController:AlertController,
    private router:Router,
    private navCtrl:NavController,
    private modalCtrl:ModalController,
  ) {
    this.initializeApp();
    this.checkInternetConnection();
    this.platform.backButton.subscribeWithPriority(
      9999,
      (processNextHandler) => {
        if (
          this._location.isCurrentPathEqualTo('/home/all') ||
          this._location.isCurrentPathEqualTo('/login')
        ) {
          // Show Exit Alert!
          this.showExitConfirm();
          processNextHandler();
        } else if(this._location.isCurrentPathEqualTo('/settings')){
          this.router.navigate(["home/all"])
        }else {
          // Navigate to back page
          this.modalCtrl.dismiss();
          this._location.back();
        }
      }
    );
  }

  ngOnInit(): void {
    var userToken = localStorage.getItem('token');
    this.isUserLoggedIn = userToken ? true : false;
    if (this.isUserLoggedIn) {
      this.httpService.setHeader();
      this.httpService.updateUserDetails();
    }
    this.commonService.userLoggedIn.subscribe(() => {
      this.isUserLoggedIn = true;
      this.userDetails = this.commonService.getUserDetail();
    });
    this.commonService.userLoggedOut.subscribe(() => {
      this.isUserLoggedIn = false;
      this.userDetails = this.commonService.getUserDetail();
      this.router.navigate(['login'])
    });
    this.httpService.userDetail.subscribe((userProfile) => {
      this.userDetails = userProfile;
    });
    this.initializeApp();
  }

  // Translate a string
  
  
  userLogout(){
    this.httpService.logOut()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(async()=>{
        SplashScreen.hide();
      },500);
      setTimeout(() => {
        if (this.commonService.getUserToken()) {
          this.navCtrl.navigateRoot('home');
          
        }else{
          this.navCtrl.navigateRoot('login');
          // GoogleAuth.initialize()
        }
      }, 3000);
      
    });

  }

  showExitConfirm() {
    this.alertController
      .create({
        header: 'App termination',
        message: 'Do you want to close the app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay',
            role: 'cancel',
            handler: () => {
              console.log('Application exit prevented!');
            },
          },
          {
            text: 'Exit',
            handler: () => {
              App.exitApp();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  checkInternetConnection() {
    if (!navigator.onLine) {
      this.commonService.presentFailureToast('No Internet Connection');
      this.commonService.isOnline = false;
    } else if (navigator.onLine) {
      this.commonService.isOnline = true;
    }
    window.addEventListener('offline', () => {
      this.commonService.presentFailureToast('No Internet Connection');
      this.commonService.isOnline = false;
      console.log(this.commonService.isOnline);
      this.commonService.networkConnection.emit();
    });
    window.addEventListener('online', () => {
      this.commonService.presentSuccessToast('Internet Connected Successfully');
      this.commonService.isOnline = true;
      this.commonService.networkConnection.emit();
    });
  }

}
