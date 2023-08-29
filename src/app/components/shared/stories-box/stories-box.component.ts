import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoriesDetailsPage } from '../../stories-details/stories-details.page';

@Component({
  selector: 'app-stories-box',
  templateUrl: './stories-box.component.html',
  styleUrls: ['./stories-box.component.scss'],
})
export class StoriesBoxComponent  implements OnInit {
  @Input() story:any;
  constructor(
    private modalCtrl:ModalController
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

}
