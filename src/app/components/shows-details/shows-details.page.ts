import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Share, ShareOptions } from '@capacitor/share';
import { AdmobAds } from 'capacitor-admob-ads';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-shows-details',
  templateUrl: './shows-details.page.html',
  styleUrls: ['./shows-details.page.scss'],
})
export class ShowsDetailsPage implements OnInit {
  @ViewChild('hvUserPost') hvUserPost: ElementRef | any;
  baseUrl:any
  episodeDetails:any
  loader:boolean = false;
  comment:any;
  commentList:any;
  userDetails:any;
  userInfoIncomplete:any;
  isModalOpen:boolean = false;
  isModalOpen2:boolean = false;
  ads:any;
  constructor(
    private httpService:HttpService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {
    this.activatedRoute.params.subscribe((res)=>{
      let id = res["id"]
      let userData:any = localStorage.getItem('userDetails')
      this.userDetails = JSON.parse(userData)
      if(this.userDetails?.gender == null || this.userDetails?.age == null || this.userDetails?.country == null || this.userDetails?.state == null){
        this.userInfoIncomplete = true
      }else{
        this.userInfoIncomplete = false
      }
      this.getEpisodeDetails(id)
      this.getCommentList(id)
      this.getNativeAds()
    })
   }

  ngOnInit() {
  }

  getNativeAds(){
    AdmobAds.loadNativeAd({ adId: "ca-app-pub-3940256099942544/2247696110", isTesting: true, adsCount: 5 }).then((res) => {
      this.ads = res.ads;
   }).catch((error) => {
      console.log("Native Error",error.message);
   });
  }

  getEpisodeDetails(id:any){
    this.loader = !this.loader
    var formData = new FormData();
    formData.append("id", id)
    this.httpService.post(apiRoutes.topShowsEpisode, formData).subscribe({
      next:(v:any) =>{
        this.loader = !this.loader
        this.baseUrl =  v.base_url
        this.episodeDetails = v.response
      },
      error:(e:any)=>{
        this.loader = !this.loader
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  getCommentList(id:any){
    var formData = new FormData();
    formData.append("id", id)
    this.httpService.post(apiRoutes.topShowsEpisodeComments, formData).subscribe({
      next:(v:any) =>{
        this.commentList = v.response
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  gotoAuthorDetails(id:any){
    this.router.navigate(['author-details', id])
  }

  showDescription(){
    this.isModalOpen2 = !this.isModalOpen2
  }

  adjustDesc() {
    let textArea;
    textArea = this.hvUserPost['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    var scrollHeight = textArea.scrollHeight;
    textArea.style.height = scrollHeight + 'px';
  }

  addComment(id:any){
    var formData = new FormData();
    formData.append("id", id)
    formData.append("comments", this.comment)
    this.httpService.post(apiRoutes.topShowsEpisodeAddComment, formData).subscribe({
      next:(v:any) =>{
        console.log("res", v)
        this.comment = ''
        this.getCommentList(id)
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  openModal(){
    this.isModalOpen = !this.isModalOpen
  }

  showLike(id:any){
    var formData = new FormData();
    formData.append("id", id)
    this.httpService.post(apiRoutes.topShowsEpisodeLike, formData).subscribe({
      next:(v:any) =>{
       console.log(v)
       this.episodeDetails.user_like_status = v.like_status
       if(v.like_status == 1){
        this.episodeDetails.total_like = Number(this.episodeDetails.total_like) + 1
       }else{
        this.episodeDetails.total_like =  Number(this.episodeDetails.total_like) - 1
       }
       console.log("like status", this.episodeDetails)
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  async shareShows(short:any){
    const options:ShareOptions={
      text: short?.title,
      dialogTitle: 'Share with friends',
      url:'https://aajtakbharat.co/shows-episodes-details/' + short?.id
    }
    await Share.share(options).then((res:any)=>{
      console.log("ress",res)
    }).catch((error)=>{
      console.log("error",error)
    })
  }

  showSave(id:any){
    var formData = new FormData();
    formData.append("id", id)
    this.httpService.post(apiRoutes.topShowsEpisodeSave, formData).subscribe({
      next:(v:any) =>{
       console.log(v)
       this.episodeDetails.user_bookmark_status = v.save_status
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
