import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-hastags-article',
  templateUrl: './hastags-article.page.html',
  styleUrls: ['./hastags-article.page.scss'],
})
export class HastagsArticlePage implements OnInit {
  id:any;
  segmentButton:any = 'news';
  hastagDetails:any;
  readNews:any;
  videoNews:any;
  audioNews:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService:HttpService,
    private commonService:CommonService
  ) { 
    this.activatedRoute.params.subscribe((params:any)=>{
      this.id = params['id']
      this.getHastagDetails(this.id)
    })
  }

  ngOnInit() {

  }

  getHastagDetails(id:any){
    this.readNews = [];
    this.videoNews = [];
    this.audioNews = [];
    let apiUrl = apiRoutes.hastag_list + '?hashtag_id=' + id
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.hastagDetails = v?.response?.data
        for(var i=0; i < this.hastagDetails?.length; i++){
          if(this.hastagDetails[i]?.contents_type == 'text' || this.hastagDetails[i]?.contents_type == 'image'){
            this.readNews.push(this.hastagDetails[i])
          }else if(this.hastagDetails[i]?.contents_type == 'video' || this.hastagDetails[i]?.contents_type == 'youtube'){
            this.videoNews.push(this.hastagDetails[i])
          }else if(this.hastagDetails[i]?.contents_type == 'audio'){
            this.audioNews.push(this.hastagDetails[i])
          }
        }
      },
      error:(e:any)=>{
        
      }
    })
  }

  

}
