import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent  implements OnInit {
  @Input() news:any;
  modalTitle:any = 'Edit';
  comment:string;
  commentList:any;
  userDetails:any;
  userInfoIncomplete:any;
  editCommentData:any;
  editcomment:any;
  isModalOpen:boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private httpService:HttpService,
    private commonService:CommonService,
    private router:Router,
    private alertController:AlertController
  ) {
    let userData:any = localStorage.getItem('userDetails')
    this.userDetails = JSON.parse(userData)
    if(this.userDetails?.gender == null || this.userDetails?.age == null || this.userDetails?.country == null || this.userDetails?.state == null){
      this.userInfoIncomplete = true
    }else{
      this.userInfoIncomplete = false
    }
  }

  ngOnInit() {
    this.getNewsComments(this.news?.id)
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
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

  addComment(){
    var formData = new FormData();
      formData.append('comments', this.comment);
      formData.append('news_id', this.news?.id);
      formData.append('status', '1');
      let apiurl = apiRoutes.add_comment
      this.httpService.post(apiurl, formData).subscribe({
        next:(v:any) =>{
          this.commentList = v?.response;
          this.commonService.presentSuccessToast(v.message)
          this.getNewsComments(this.news?.id)
          this.comment = ''
        },
        error:(e:any)=>{
          this.commonService.presentFailureToast(e.message)
        }
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
            this.modalCtrl.dismiss()
            this.router.navigate(['personal-information', this.news?.id])
          },
        },
      ],
    });

    await alert.present();
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
          this.getNewsComments(this.news?.id)
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
          this.getNewsComments(this.news?.id)
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
          this.getNewsComments(this.news?.id)
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

}
