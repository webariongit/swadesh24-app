import { Component, OnDestroy, OnInit } from '@angular/core';
import { baseUrl } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';

@Component({
  selector: 'app-short-slider',
  templateUrl: './short-slider.page.html',
  styleUrls: ['./short-slider.page.scss'],
})
export class ShortSliderPage implements OnInit , OnDestroy{
  baseUrl:any = baseUrl;
  shortList:any;
  currentSlideIndex = 0
  constructor(
    private commonService:CommonService
  ) { 
    let short:any = localStorage.getItem('shorts')
    this.shortList = JSON.parse(short)
  }
  

  ionViewDidLeave(){
    this.commonService.pauseVideo.emit()
  }

  ngOnInit() {
   
  }

  checkSlide(event:any){
    this.currentSlideIndex = event.srcElement.swiper.activeIndex;
    this.commonService.playVideo.emit(this.currentSlideIndex)
  }


  ngOnDestroy(): void {
    console.log("page Destroyed")
  }

}
