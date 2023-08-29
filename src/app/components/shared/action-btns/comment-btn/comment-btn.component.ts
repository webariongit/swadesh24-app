import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentComponent } from '../../comment/comment.component';

@Component({
  selector: 'app-comment-btn',
  templateUrl: './comment-btn.component.html',
  styleUrls: ['./comment-btn.component.scss'],
})
export class CommentBtnComponent  implements OnInit {

  @Input() newsDetails:any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    
  }

  async openModal(news:any) {
    const modal = await this.modalCtrl.create({
      component: CommentComponent,
      componentProps: {
        news
      }
    });
    modal.present();
  }

  
}
