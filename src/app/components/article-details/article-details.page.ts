import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';
import { Share, ShareOptions } from '@capacitor/share';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
  @ViewChild('hvUserPost') hvUserPost: ElementRef | any;
  
  loader:any;
  newsId:any;
  newsDetails:any;
  commentList:any;
  comment:string;
  userDetails:any;
  userInfoIncomplete:boolean = false;
  isModalOpen = false;
  editCommentData:any;
  editcomment:any;
  modalTitle:any;
  
  constructor(
    private router:Router,
    private httpService:HttpService,
    private activatedRoute:ActivatedRoute,
    private commonService:CommonService,
    private alertController:AlertController,
    private domsanitizer:DomSanitizer,
  ) {
    this.activatedRoute.params.subscribe((params)=>{
      this.newsId = params['id'];
      let userData:any = localStorage.getItem('userDetails')
      this.userDetails = JSON.parse(userData)
      if(this.userDetails?.first_name == null || this.userDetails?.contact == null){
        this.userInfoIncomplete = true
      }else{
        this.userInfoIncomplete = false
      }
      this.getNewsDetails(this.newsId)
    })
   }

  ngOnInit() {
    this.newsViews();
  }

  gotoAuthorDetails(){
    this.router.navigate(['author-details'])
  }

  async shareNews(news:any){
    const options:ShareOptions={
      title: news?.title,
      text: news?.sub_title,
      dialogTitle: 'Share with friends',
      url:'https://swadesh24.com/article-details?news_id=' + news?.id,
    }
    await Share.share(options).then((res:any)=>{
      this.newsShared(news?.id)
    }).catch((error)=>{
      console.log("error",error)
    })
  }
  
  newsShared(id:any){
    let formData = new FormData();
    formData.append("news_id", id)
    let apiUrl = apiRoutes.news_share;
    this.httpService.post(apiUrl, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
      },
      error:(e:any)=>{
        console.log(e)
      }
    })
  }

  getNewsDetails(id:any){
    this.loader = true;
    let apiUrl = apiRoutes.news_list + '?news_id=' + id;
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loader = false;
        this.newsDetails = v?.response[0];
        if(this.newsDetails.contents_type == 'youtube'){
          this.newsDetails.contents = this.domsanitizer.bypassSecurityTrustResourceUrl(this.newsDetails.contents)
        }
        this.getNewsComments(id)
      },
      error:(e:any)=>{
        this.loader = false;
      }
    })
  }

  getNewsComments(id:any){
    let apiUrl = apiRoutes.comment_list + '?news_id=' + id;
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.commentList = v?.response;
      },
      error:(e:any)=>{
      }
    })
  }

  
  adjustDesc() {
      let textArea;
      textArea = this.hvUserPost['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      textArea.style.overflow = 'hidden';
      textArea.style.height = 'auto';
      var scrollHeight = textArea.scrollHeight;
      textArea.style.height = scrollHeight + 'px';
  }


  addComment(){
    var formData = new FormData();
    formData.append('comments', this.comment);
    formData.append('news_id', this.newsId);
    formData.append('status', '1');
    let apiurl = apiRoutes.add_comment
    this.httpService.post(apiurl, formData).subscribe({
      next:(v:any) =>{
        this.commentList = v?.response;
        this.commonService.presentSuccessToast(v.message)
        this.getNewsComments(this.newsId);
        this.comment = '';
      },
      error:(e:any)=>{
        this.commonService.presentFailureToast(e.message)
      }
    })
  }

  async deleteComment(id:any){
    const alert = await this.alertController.create({
      header: 'Warning',
      // subHeader: '',
      message: 'Are your sure to delete this Comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('csncel')
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteData(id);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteData(id:any){
    let apiUrl = apiRoutes.delete_comment + '/' + id
    this.httpService.delete(apiUrl).subscribe({
      next: (v: any) => {
        console.log(v)
        if (v.status == 200) {
          this.getNewsComments(this.newsId)
          this.commonService.presentSuccessToast(v.message)
        }
      },
      error: (e) => {
        console.log(e)
        if (e.status == 400) {
          this.commonService.presentFailureToast(e.error.message)
        }

        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      },
      complete: () => console.info('complete') 
    })
  }

  async redirectToProfile(){
    const alert = await this.alertController.create({
      header: 'Warning',
      subHeader: 'Your profile is incomplete',
      message: 'Please update your profile before comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('csncel')
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['my-profile'])
          },
        },
      ],
    });

    await alert.present();
  }
  
  openEditComment(isOpen:boolean, comment:any, type:any){
    this.isModalOpen = isOpen;
    this.editCommentData = comment;
    this.modalTitle = type
    if(type == 'Edit'){
      this.editcomment = comment.comment;
    }else{
      this.editcomment = ''
    }
    console.log("edit comment",this.editcomment)
  }

  submitEditComment(){
    let formData = new FormData()
    formData.append("comment_id",  this.editCommentData?.id)
    formData.append("comments",  this.editcomment)
    let apiUrl = apiRoutes.update_comment
    this.httpService.post(apiUrl, formData).subscribe({
      next: (v: any) => {
        console.log(v)
        if (v.status == 201) {
          this.getNewsComments(this.newsId)
          this.isModalOpen = false;
          this.commonService.presentSuccessToast(v.message)
        }
      },
      error: (e) => {
        console.log(e)
        if (e.status == 400) {
          this.commonService.presentFailureToast(e.error.message)
        }

        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      },
      complete: () => console.info('complete') 
    })
  }

  submitReplyComment(){
    let formData = new FormData()
    formData.append("comment_id",  this.editCommentData?.id)
    formData.append("news_id",  this.editCommentData?.news_id)
    formData.append("user_id", this.userDetails?.user_id)
    formData.append("comments",  this.editcomment)
    let apiUrl = apiRoutes.add_comment
    this.httpService.post(apiUrl, formData).subscribe({
      next: (v: any) => {
        console.log(v)
        if (v.status == 201) {
          this.getNewsComments(this.newsId)
          this.isModalOpen = false;
          this.commonService.presentSuccessToast(v.message)
        }
      },
      error: (e) => {
        console.log(e)
        if (e.status == 400) {
          this.commonService.presentFailureToast(e.error.message)
        }

        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      },
      complete: () => console.info('complete') 
    })
  }

  newsLike(id:any){
    let formData = new FormData();
    formData.append("news_id", id)
    if(this.newsDetails?.likes == 0){
      formData.append("likes", '1')
    }else{
      formData.append("likes", '0')
    }
    let apiUrl = apiRoutes.news_like;
    this.httpService.post(apiUrl, formData).subscribe({
      next:(v:any) =>{
        this.commonService.presentSuccessToast(v.message)
        this.getNewsDetails(id)
      },
      error:(e:any)=>{
        this.commonService.presentFailureToast(e.message)
      }
    })
  }

  newsSave(id:any){
    let formData = new FormData();
    formData.append("news_id", id)
    if(this.newsDetails?.bookmark == 0){
      formData.append("bookmark", '1')
    }else{
      formData.append("bookmark", '0')
    }
    let apiUrl = apiRoutes.news_bookmark;
    this.httpService.post(apiUrl, formData).subscribe({
      next:(v:any) =>{
        this.commonService.presentSuccessToast(v.message)
        this.getNewsDetails(id)
      },
      error:(e:any)=>{
        this.commonService.presentFailureToast(e.message)
      }
    })
  }

  newsViews(){
    let formData = new FormData();
    formData.append("news_id", this.newsId);
    let apiUrl = apiRoutes.news_view;
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
