import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { baseUrl } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';


@Component({
  selector: 'app-shorts-details',
  templateUrl: './shorts-details.page.html',
  styleUrls: ['./shorts-details.page.scss'],
})
export class ShortsDetailsPage implements OnInit, OnDestroy {
  currentSlideIndex = 1
  shorts:any;
  shortList:any;
  baseUrl:any = baseUrl;
  id:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private commonService:CommonService,
  ) {
    this.activatedRoute.params.subscribe((res)=>{
      this.id = res["id"]
      let short:any = localStorage.getItem('shorts')
      this.getShortList(this.id, JSON.parse(short));
    })
  }
 
  
  ngOnInit() {
    
  }


  checkSlide(event:any){
    this.currentSlideIndex = event.srcElement.swiper.activeIndex;
    this.commonService.playVideo.emit(this.currentSlideIndex)
  }

  getShortList(id:any, short:any){
      const filteredElements = short.filter((element:any) => element.id == id);
      const remainingElements = short.filter((element:any) => element.id != id);
      this.shortList = [...filteredElements, ...remainingElements]
      console.log("shortList", this.shortList)
  }

  ngOnDestroy(): void {
    this.commonService.pauseVideo.emit()
  }

}
