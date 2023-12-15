import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiRoutes, baseUrl } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';


@Component({
  selector: 'app-shorts-details',
  templateUrl: './shorts-details.page.html',
  styleUrls: ['./shorts-details.page.scss'],
})
export class ShortsDetailsPage implements OnInit {
  currentSlideIndex = 1
  shorts:any;
  shortList:any;
  baseUrl:any = baseUrl;
  id:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private commonService:CommonService,
    private httpService:HttpService,
    private router:Router
  ) {
    this.activatedRoute.params.subscribe((res)=>{
      this.id = res["id"]
      let short:any = localStorage.getItem('shorts')
      this.getShortList(this.id, JSON.parse(short));
    })
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

  getShortList(id:any, short:any){
      const filteredElements = short.filter((element:any) => element.id == id);
      const remainingElements = short.filter((element:any) => element.id != id);
      this.shortList = [...filteredElements, ...remainingElements]
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
