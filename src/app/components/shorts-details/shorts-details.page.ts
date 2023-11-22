import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Share, ShareOptions } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-shorts-details',
  templateUrl: './shorts-details.page.html',
  styleUrls: ['./shorts-details.page.scss'],
})
export class ShortsDetailsPage implements OnInit {
  @ViewChild('myVideo') myVideo: ElementRef;
  shortList:any;
  baseUrl:any;
  isModalOpen = false;
  comment:string;
  commentList:any;
  userDetails:any;
  selectShortId:any;
  id:any;
  constructor(
    private router:Router,
    private httpService:HttpService,
    private commonService:CommonService,
    private activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((res)=>{
      this.id = res["id"]
    })
    let userData:any = localStorage.getItem('userDetails')
    this.userDetails = JSON.parse(userData)
  }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.getShortList();
  }

  toggleVideo(id:any) {
    const video: HTMLVideoElement = this.myVideo.nativeElement;
    if (video.paused) {
      video.play();
      this.shortView(id)
    } else {
      video.pause();
    }
  }

  getShortList(){
    this.httpService.get(apiRoutes.shorts).subscribe({
      next:(v:any) =>{
        this.baseUrl = v.base_path;
        this.shortList = v?.response?.data;
        console.log(this.shortList)
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
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
        this.shortList.forEach((el:any) =>{
          if(el.id == id){
            if(status == 0){
              el.user_like_status = 1
              el.total_likes = Number(el.total_likes) + 1
            }else{
              el.user_like_status = 0
              el.total_likes = Number(el.total_likes) - 1
            }
          }
        })
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
        this.shortList.forEach((el:any) =>{
          if(el.author_id == id){
            if(status == 0){
              el.author_follow_status = 1
            }else{
              el.author_follow_status = 0
            }
            console.log(el)
          }
        })
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  openComment(modal:boolean ,id:any){
    this.isModalOpen = modal;
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
        this.commentList = v.response
        console.log("Comments",this.commentList)
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
      },
      error:(e:any)=>{
        console.log(e)
      }
    })
  }

}
