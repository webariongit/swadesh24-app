import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {
  loader:boolean = false;
  storyList:any;
  stories:any = [];
  currentPage: number = 1;
  totalPage:number = 1;
  firstLoad:boolean = true;
  constructor(
    private httpService:HttpService
  ) { }

  ngOnInit() {
    this.getStoryList()
  }

  getStoryList(){
    this.loader = true;
    this.storyList = [];
    if((this.currentPage < this.totalPage) ||  this.firstLoad){
      let apiUrl = apiRoutes.story_list + '?page=' + this.currentPage
      this.httpService.get(apiUrl).subscribe({
        next:(v:any) =>{
          this.firstLoad = false;
          this.loader = false;
          this.storyList = v.response?.data;
          this.totalPage = v.response?.last_page;
          for(var i=0; i < this.storyList?.length; i++){
            this.stories.push(this.storyList[i])
          }
        },
        error:(e:any)=>{
          this.loader = false;
        }
      })
    }
  }

  getMoreList(infiniteScroll:any){
    this.getStoryList()
    setTimeout(() => {
      (infiniteScroll as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
