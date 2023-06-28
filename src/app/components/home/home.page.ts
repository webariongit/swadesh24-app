import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public sliderData = [
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"}
  ]

  swiper: Swiper;

  ionViewDidEnter() {
    this.swiper = new Swiper('.home-carousel', {
      watchSlidesProgress: true,
      on: {
        progress: () => {
          console.log(this.swiper?.slides[0]); // Example: Output the progress of the first slide
        },
      },
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
