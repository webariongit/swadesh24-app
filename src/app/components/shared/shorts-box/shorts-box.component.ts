import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';
import { environment } from 'src/environments/environment';
import { Share, ShareOptions } from '@capacitor/share';
import { apiRoutes } from 'src/app/constant/config';
import { ShortsDetailsPage } from '../../shorts-details/shorts-details.page';

@Component({
  selector: 'app-shorts-box',
  templateUrl: './shorts-box.component.html',
  styleUrls: ['./shorts-box.component.scss'],
})
export class ShortsBoxComponent  implements OnInit {
  @Input() shorts:any;
  @Input() baseUrl:any;

  constructor(
    private modalCtrl:ModalController,
  ) { }

  ngOnInit() {

  }

  async showShorts(id:any){
    let contactModal = this.modalCtrl.create({
      component: ShortsDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        id
      }
    });
    (await contactModal).present();
  }
  

}
