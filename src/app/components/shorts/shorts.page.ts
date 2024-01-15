import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';
import Swiper from 'swiper';
@Component({
  selector: 'app-shorts',
  templateUrl: './shorts.page.html',
  styleUrls: ['./shorts.page.scss'],
})
export class ShortsPage implements OnInit {
  shorts:any = [];
  shortList:any
  base_url:any;
  loader:boolean = false;
  currentPage: number = 1;
  totalPage:number = 1;
  firstLoad:boolean = true;

  constructor(
    private httpService:HttpService,
    private router:Router,
  ) { }
  
  ionViewDidEnter(){
    this.getShortList()
  }

  ngOnInit() {
    
  }

  getShortList(){
    this.shortList = [];
    if(this.currentPage <= this.totalPage){
      if(this.firstLoad){
        this.loader = true;
      }else{
        this.currentPage = Number(this.currentPage) + 1;
      }
      let apiUrl = apiRoutes.shorts + '?page=' + this.currentPage
      this.httpService.get(apiUrl).subscribe({
        next:(v:any) =>{
          this.base_url = v.base_path
          this.firstLoad = false;
          this.loader = false;
          this.shortList = v.response?.data;
          this.totalPage = v.response?.last_page;
          for(var i=0; i < this.shortList?.length; i++){
            this.shorts.push(this.shortList[i])
          }
          localStorage.setItem("shorts", JSON.stringify(this.shorts))
        },
        error:(e:any)=>{
          this.loader = false;
        }
      })
    }
  }

  getMoreList(infiniteScroll:any){
    this.getShortList()
    setTimeout(() => {
      (infiniteScroll as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
