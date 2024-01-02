import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-delete-my-account',
  templateUrl: './delete-my-account.page.html',
  styleUrls: ['./delete-my-account.page.scss'],
})
export class DeleteMyAccountPage implements OnInit {
  userDetails:any;
  profileImage:any;
  constructor(
    private alertController:AlertController,
    private httpService:HttpService,
    private commonService:CommonService,
    private router:Router
  ) { }

  ngOnInit() {
    let userData:any = localStorage.getItem('userDetails');
    this.userDetails = JSON.parse(userData)
  }

  async presentAlertPopup(){
    const alert = await this.alertController.create({
      header: 'Warning',
      // subHeader: '',
      message: 'Are your sure to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('csncel')
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteData();
          },
        },
      ],
    });

    await alert.present();
  }

  deleteData(){
    let apiUrl = apiRoutes.delete_account
    this.httpService.post(apiUrl, '').subscribe({
      next: (v: any) => {
        console.log(v)
        if (v.status == 200) {
          this.commonService.presentSuccessToast(v.message);
          this.httpService.updateUserDetails();
          this.router.navigate(['home']); 
        }
      },
      error: (e) => {
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      },
      complete: () => console.info('complete') 
    })
  }

}
