import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shorts-details',
  templateUrl: './shorts-details.page.html',
  styleUrls: ['./shorts-details.page.scss'],
})
export class ShortsDetailsPage implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    private router:Router
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
    this.router.navigate(['shorts'])
  }

  storyLike(){

  }

  shareStory(){

  }

}
