import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoriesDetailsPage } from '../../stories-details/stories-details.page';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Share, ShareOptions } from '@capacitor/share';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';
import { CommonService } from 'src/app/service/common-service/common.service';

@Component({
  selector: 'app-stories-box',
  templateUrl: './stories-box.component.html',
  styleUrls: ['./stories-box.component.scss'],
})
export class StoriesBoxComponent  implements OnInit {
  @Input() story:any;
  @Input() storyPage:boolean;
  baseUrl:any = environment.apiUrl
  ampUrl: SafeUrl | string;
  liked:boolean;

  constructor(
    private modalCtrl:ModalController,
    private httpService:HttpService,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    if(this.story?.likes == 0){
      this.liked = false
    }else{
      this.liked = true
    }
  }

  async showStories(id:any){
    let contactModal = this.modalCtrl.create({
      component: StoriesDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        id
      }
    });
    (await contactModal).present();
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
    if(!this.liked){
      formData.append("likes", '1')
    }else{
      formData.append("likes", '0')
    }
    let apiUrl = apiRoutes.story_like;
    this.httpService.post(apiUrl, formData).subscribe({
      next:(v:any) =>{
        if(!this.liked){
          this.liked = true
          this.story.total_likes = Number(this.story.total_likes) + 1
        }else{
          this.liked = false
          this.story.total_likes = Number(this.story.total_likes) - 1
        }
       this.commonService.presentSuccessToast(v.message)
      },
      error:(e:any)=>{
        console.log(e)
        this.commonService.presentFailureToast(e.message)
      }
    })
  }


}
