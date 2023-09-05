import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoriesDetailsPage } from '../../stories-details/stories-details.page';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Browser } from '@capacitor/browser';
import { apiRoutes } from 'src/app/constant/config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stories-box',
  templateUrl: './stories-box.component.html',
  styleUrls: ['./stories-box.component.scss'],
})
export class StoriesBoxComponent  implements OnInit {
  @Input() story:any;
  baseUrl:any = environment.apiUrl
  ampUrl: SafeUrl | string;
  constructor(
    private modalCtrl:ModalController,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {}

  async showStories(id:any){
    let contactModal = this.modalCtrl.create({
      component: StoriesDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        id
      }
    });
    (await contactModal).present();
  }

  async getUrl(id:any){
    const slider = await Browser.open({ url: `https://web-stories.swadesh24.com/?story_id=${id}` });
  }

}
