import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes, baseUrl } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

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
    private commonService:CommonService,
    private httpService:HttpService,
    private router:Router
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
    this.shortList.forEach((el:any, index:any)=>{
      if(this.currentSlideIndex == index){
        this.shortView(el.id)
      }
    })
    this.commonService.playVideo.emit(this.currentSlideIndex)
  }


  ngOnDestroy(): void {
    console.log("page Destroyed")
  }

  shortView(id:any){
    var formData = new FormData();
    formData.append("shorts_id", id)
    this.httpService.post(apiRoutes.shortView, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

}
