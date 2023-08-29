import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Share, ShareOptions } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-stories-details',
  templateUrl: './stories-details.page.html',
  styleUrls: ['./stories-details.page.scss'],
})
export class StoriesDetailsPage implements OnInit {
  progressTime:any;
  @Input() id:any;
  loader:boolean = true;
  storyDetails:any;
  swiperEl:any = document.querySelector("swiper-container");
  
  constructor(
    private modalCtrl:ModalController,
    private httpService:HttpService,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    this.getStoryDetails(this.id)
    this.storyViews(this.id)
  }

  swiper: Swiper;

  ngAfterViewInit() {
    // this.swiperEl.addEventListener("autoplaytimeleft", (e:any) => {
    //   const [swiper, time, progress] = e.detail;
    //   this.progressTime = `${Math.ceil(time / 1000)}s`
    // });
  }

  closeModal(){
    this.modalCtrl.dismiss()
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

  async shareStory(story:any){
    const options:ShareOptions={
      title: story?.title,
      text: story?.sub_title,
      dialogTitle: 'Share with friends',
      url:'https://swadesh24.com/stories-slider?story_id=' + story?.id,
    }
    await Share.share(options).then((res:any)=>{
      // this.storyShared(story?.id)
    }).catch((error)=>{
      console.log("error",error)
    })
  }

  storyShared(id:any){
    let formData = new FormData();
    formData.append("story_id", id)
    let apiUrl = apiRoutes.story_share;
    this.httpService.post(apiUrl, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
      },
      error:(e:any)=>{
        console.log(e)
      }
    })
  }


  storyLike(id:any){
    let formData = new FormData();
    formData.append("story_id", id)
    if(this.storyDetails?.likes == 0){
      formData.append("likes", '1')
    }else{
      formData.append("likes", '0')
    }
    let apiUrl = apiRoutes.story_like;
    this.httpService.post(apiUrl, formData).subscribe({
      next:(v:any) =>{
       this.getStoryDetails(this.id)
       this.commonService.presentSuccessToast(v.message)
      },
      error:(e:any)=>{
        console.log(e)
        this.commonService.presentFailureToast(e.message)
      }
    })
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
