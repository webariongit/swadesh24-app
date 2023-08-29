import { Component, Input, OnInit } from '@angular/core';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-like-btn',
  templateUrl: './like-btn.component.html',
  styleUrls: ['./like-btn.component.scss'],
})
export class LikeBtnComponent  implements OnInit {

  @Input() newsDetails:any;
  active:boolean = false;


  constructor(
    private httpService:HttpService,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    if(this.newsDetails?.likes == 1){
      this.active = true;
    }else{
      this.active = false;
    }
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
        this.active = !this.active
        this.commonService.presentSuccessToast(v.message)
      },
      error:(e:any)=>{
        this.commonService.presentFailureToast(e.message)
      }
    })
  }


}
