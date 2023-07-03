import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-stories-details',
  templateUrl: './stories-details.page.html',
  styleUrls: ['./stories-details.page.scss'],
})
export class StoriesDetailsPage implements OnInit {
  carouselOptions:any={
    watchSlidesProgress:true,
    autoplayDelay:2500
  }
  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
  }

  swiper: Swiper;

  ngAfterViewInit() {
    setTimeout(() => {
      const swiperContainer = document.querySelector('.swiper-container');
      if (swiperContainer) {
        const swiper = new Swiper('.swiper-container', {
          watchSlidesProgress: true,
          on: {
            progress: () => {
              console.log(swiper.slides[0]); // Example: Output the progress of the first slide
            },
          },
        });
      }
    }, 500); // Adjust the delay as needed
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

}
