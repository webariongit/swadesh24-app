import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Share, ShareOptions } from '@capacitor/share';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-short-details',
  templateUrl: './short-details.component.html',
  styleUrls: ['./short-details.component.scss'],
})
export class ShortDetailsComponent  implements OnInit{
  @Input() short:any;
  @Input() baseUrl:any;
  @Input() index:any;
  isModalOpen = false;
  comment:string;
  commentList:any;
  selectShortId:any;
  videoPaused = true;
  

  constructor(
    private httpService:HttpService,
    private router:Router,
    private commonService:CommonService
  ) { 
    this.commonService.playVideo.subscribe(res=>{
      this.playVideo(res)
    })
  }

  ngOnInit() {
    this.playVideo(0)
  }

  playVideo(currentIndex:number): void {
    // Pause the previous video
    const previousVideo = document.querySelector(`#video-${currentIndex - 1}`);
      const nextVideo = document.querySelector(`#video-${currentIndex + 1}`);
      if (previousVideo) {
        (previousVideo as HTMLVideoElement).pause();
      }
      
      if(nextVideo){
        (nextVideo as HTMLVideoElement).pause();
      }
  
      // Play the current video
      const currentVideo = document.querySelector(`#video-${currentIndex}`);
      if (currentVideo) {
        (currentVideo as HTMLVideoElement).play();
        this.commonService.pauseVideo.subscribe(()=>{
          (currentVideo as HTMLVideoElement).pause();
        })
      }
    
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

  storyLike(id:any, status:any){
    var formData = new FormData();
    formData.append("shorts_id", id)
    this.httpService.post(apiRoutes.shortLike, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
        this.commonService.presentSuccessToast(v.message)
        if(status == 0){
          this.short.user_like_status = 1
          this.short.total_likes = Number(this.short.total_likes) + 1
        }else{
          this.short.user_like_status = 0
          this.short.total_likes = Number(this.short.total_likes) - 1
        }
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  async shareShort(short:any){
    const options:ShareOptions={
      text: short?.description,
      dialogTitle: 'Share with friends'
    }
    await Share.share(options).then((res:any)=>{
      this.shortShared(short?.id)
    }).catch((error)=>{
      console.log("error",error)
    })
  }

  shortShared(id:any){
    let formData = new FormData();
    formData.append("shorts_id", id)
    let apiUrl = apiRoutes.shortShare;
    this.httpService.post(apiUrl, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
      },
      error:(e:any)=>{
        console.log(e)
      }
    })
  }

  gotoAuthor(id:any){
    this.router.navigate(['author-short-details', id])
  }

  followAuthor(id:any, status:any){
    var formData = new FormData();
    formData.append("author_id", id)
    this.httpService.post(apiRoutes.authorFollow, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
        this.commonService.presentSuccessToast(v.message)
        if(status == 0){
          this.short.author_follow_status = 1
        }else{
          this.short.author_follow_status = 0
        }
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  openComment(id:any){
    this.isModalOpen = !this.isModalOpen;
    if(id){
      this.getComments(id)
    }
  }

  getComments(id:any){
    this.selectShortId =  id;
    let formData = new FormData();
    formData.append("shorts_id", id);
    this.commentList = ''
    this.httpService.post(apiRoutes.shortComment, formData).subscribe({
      next:(v:any) =>{
        this.commentList = v.response;
        this.short.total_comments = this.commentList?.length;
      },
      error:(e:any)=>{
        console.log(e)
      }
    })
  }

  addComment(){
    let formData = new FormData();
    formData.append("shorts_id", this.selectShortId);
    formData.append("comments", this.comment);
    this.httpService.post(apiRoutes.shortAddComment, formData).subscribe({
      next:(v:any) =>{
        console.log("Comments",v)
        this.getComments(this.selectShortId);
        this.isModalOpen = !this.isModalOpen;
      },
      error:(e:any)=>{
        console.log(e)
      }
    })
  }

}
