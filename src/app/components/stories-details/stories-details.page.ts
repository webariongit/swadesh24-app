import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-stories-details',
  templateUrl: './stories-details.page.html',
  styleUrls: ['./stories-details.page.scss'],
})
export class StoriesDetailsPage implements OnInit {
  progressTime:any;
  swiperEl:any = document.querySelector("swiper-container");
  
  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {

  }

  swiper: Swiper;

  ngAfterViewInit() {
    this.swiperEl.addEventListener("autoplaytimeleft", (e:any) => {
      const [swiper, time, progress] = e.detail;
      this.progressTime = `${Math.ceil(time / 1000)}s`
    });
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  

}
