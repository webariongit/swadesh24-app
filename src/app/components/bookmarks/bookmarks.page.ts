import { Component, OnInit } from '@angular/core';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {
  segmentButton:any = 'news';
  readNews:any;
  audioNews:any;
  videoNews:any;
  bookMarkDetails:any;
  loading:boolean = false;

  constructor(
    private httpService:HttpService
  ) { }

  ngOnInit() {
    this.getBookMarkedData()
  }

  getBookMarkedData(){
    let apiUrl = apiRoutes.saved_bookmark
    this.readNews = [];
    this.videoNews = [];
    this.audioNews = [];
    this.loading = true;
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.bookMarkDetails = v?.response
        this.loading = false;
        for(var i=0; i < this.bookMarkDetails?.length; i++){
          if(this.bookMarkDetails[i]?.contents_type == 'text' || this.bookMarkDetails[i]?.contents_type == 'image'){
            this.readNews.push(this.bookMarkDetails[i])
          }else if(this.bookMarkDetails[i]?.contents_type == 'video' || this.bookMarkDetails[i]?.contents_type == 'youtube'){
            this.videoNews.push(this.bookMarkDetails[i])
          }else if(this.bookMarkDetails[i]?.contents_type == 'audio'){
            this.audioNews.push(this.bookMarkDetails[i])
          }
        }
      },
      error:(e:any)=>{
        console.log(e)
        this.loading = false;
      }
    })
  }


}
