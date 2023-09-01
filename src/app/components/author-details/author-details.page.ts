import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.page.html',
  styleUrls: ['./author-details.page.scss'],
})
export class AuthorDetailsPage implements OnInit {
  segmentButton:any = 'news';
  authorId:any;
  authorDetails:any;
  authorWatchNews:any;
  authoListenNews:any;
  authorReadNews:any;
  authorStories:any;
  loading:boolean = false

  constructor(
    private activatedRoute:ActivatedRoute,
    private httpService:HttpService
  ) { 
    this.activatedRoute.params.subscribe((params)=>{
      this.authorId = params['id'];
      this.getAuthorDetails(this.authorId)
    })
  }

  ngOnInit() {
  }

  getAuthorDetails(id:any){
    this.loading = true;
    let apiUrl = apiRoutes.author_details + '?author_id=' + id;
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loading = false;
        this.authorReadNews = [];
        this.authorWatchNews = [];
        this.authoListenNews = [];
        this.authorDetails = v?.response;
        this.authorStories = v?.stories;
        let authorNewsData = v?.news;
        for(var i=0; i < authorNewsData?.length; i++){
          if(authorNewsData[i]?.contents_type == 'text' || authorNewsData[i]?.contents_type == 'image'){
            this.authorReadNews.push(authorNewsData[i])
          }else if(authorNewsData[i]?.contents_type == 'video' || authorNewsData[i]?.contents_type == 'youtube'){
            this.authorWatchNews.push(authorNewsData[i])
          }else if(authorNewsData[i]?.contents_type == 'audio'){
            this.authoListenNews.push(authorNewsData[i])
          }
        }
      },
      error:(e:any)=>{
        this.loading = false;
        console.log("error", e)
      }
    })
  }

}
