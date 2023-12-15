import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';
import { environment } from 'src/environments/environment';
import Swiper from 'swiper';

@Component({
  selector: 'app-stories-details',
  templateUrl: './stories-details.page.html',
  styleUrls: ['./stories-details.page.scss'],
})
export class StoriesDetailsPage implements OnInit, AfterViewInit {
  progressTime:any;
  @Input() id:any;
  loader:boolean = true;
  storyDetails:any;
  swiperEl:any = document.querySelector("swiper-container");
  ampUrl: any;
  baseUrl:any = environment.apiUrl
  constructor(
    private modalCtrl:ModalController,
    private httpService:HttpService,
    private commonService:CommonService,
    private router:Router,
    private sanitizer:DomSanitizer,
  ) {
  
  }


  ngAfterViewInit(): void {
    this.getUrl()
  }

  ngOnInit() {
    this.getStoryDetails(this.id)
    this.storyViews(this.id)
  }

  async getUrl(){
    this.ampUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web-stories.aajtakbharat.co/?story_id=${this.id}`)
  }

  swiper: Swiper;

  closeModal(){
    this.modalCtrl.dismiss();
    this.router.navigate(['stories'])
  }

  getStoryDetails(id:any){
    this.loader = true;
    let apiUrl = apiRoutes.story_list + '?story_id=' + id
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loader = false;
        this.storyDetails = v?.response?.data[0];
        if(this.isImage(this.storyDetails.media_file)){
          this.storyDetails.contentType = 'image'
        }else if(this.isVideo(this.storyDetails.media_file)){
          this.storyDetails.contentType = 'video'
        }
      },
      error:(e:any)=>{
        this.loader = false;
      }
    })
  }

  isImage(url:any) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  isVideo(url:any) {
    console.log("video url",url)
    return /\.(mp4|m4s|m4v|m4a)$/.test(url);
  }

  storyViews(id:any){
    let formData = new FormData();
    formData.append("story_id", id)
    
    let apiUrl = apiRoutes.story_view;
    this.httpService.post(apiUrl, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
      },
      error:(e:any)=>{
        console.log(e)
      }
    })
  }

}
