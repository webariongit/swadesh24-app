import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdmobAds } from 'capacitor-admob-ads';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  shortList:any;
  storyList:any;
  pollList:any;
  base_url:any;
  topShows:any;
  ads:any;
  loader:boolean = false;
  constructor(
    private router:Router,
    private httpService:HttpService,
    private commonService:CommonService
  ) { 
    this.commonService.pollDataUpdated.subscribe(()=>{
      this.getPollList();
    })
  }

  ngOnInit() {
    this.getTopShows();
    this.getPollList();
    this.getShortList();
    this.getStoryList();
    this.getNativeAds();
  }

  openSnakeGame(){
    this.router.navigate(['snake'])
  }

  openTicTak(){
    this.router.navigate(['tic-tak-toe'])
  }

  getNativeAds(){
    AdmobAds.loadNativeAd({ adId: "ca-app-pub-8538744979078345/3308488337", isTesting: false, adsCount: 5 }).then((res) => {
      this.ads = res.ads;
   }).catch((error) => {
      console.log("Native Error",error.message);
   });
  }

  getShortList(){
    this.httpService.get(apiRoutes.shorts).subscribe({
      next:(v:any) =>{
        this.base_url = v.base_path
        this.shortList = v?.response?.data
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  getStoryList(){
    this.httpService.get(apiRoutes.story).subscribe({
      next:(v:any) =>{
        this.storyList = v?.response?.data
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  getPollList(){
    this.httpService.get(apiRoutes.polls).subscribe({
      next:(v:any) =>{
        this.pollList = v?.response?.data
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  getTopShows(){
    this.loader = !this.loader
    this.httpService.get(apiRoutes.topShows).subscribe({
      next:(v:any) =>{
        this.loader = !this.loader
        this.topShows = v?.response?.data
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

  gotoPage(page:any){
    this.router.navigate([page])
  }

}
