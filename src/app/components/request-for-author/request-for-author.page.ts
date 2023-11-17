import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-request-for-author',
  templateUrl: './request-for-author.page.html',
  styleUrls: ['./request-for-author.page.scss'],
})
export class RequestForAuthorPage implements OnInit {
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
      message: 'Are your sure you want to request for author?',
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
            this.request();
          },
        },
      ],
    });

    await alert.present();
  }

  request(){
    let apiUrl = apiRoutes.requestForAuthor;
    this.httpService.get(apiUrl).subscribe({
      next: (v: any) => {
        console.log(v)
        if (v.status == 200) {
          this.commonService.presentSuccessToast(v.message);
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
