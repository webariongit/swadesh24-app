import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AdmobAds } from 'capacitor-admob-ads';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  ads:any;
  shortList:any;
  public sliderData = [
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"}
  ]
  colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  loader:boolean = false;
  base_url:any;
  category:any;
  latestNews:any;
  newsCategory:any;
  sportsCategory:any;
  businessCategory:any;
  storyList:any;
  entertainmentList:any;
  isNetworkAvailable:boolean;
  teamList:any;

  constructor(
    private httpService:HttpService,
    private commonService:CommonService,
    private router:Router,
    private menuCntrl:MenuController,
  ) {
    this.menuCntrl.enable(true);
    this.commonService.networkConnection.subscribe(() => {
      this.isNetworkAvailable = this.commonService.isOnline;
      if (this.isNetworkAvailable) {
        this.initializeData();
      }
    });
  }
  
  ngOnDestroy(): void {
    this.loader = false;
  }
  
  ionViewDidEnter(){
    this.initializeData();
  }

  ngOnInit() {
    this.isNetworkAvailable = this.commonService.isOnline;
    this.getNativeAds();
  }

  checkSlide(){
    console.log("triggered")
  }

  getNativeAds(){
    AdmobAds.loadNativeAd({ adId: "ca-app-pub-3940256099942544/2247696110", isTesting: true, adsCount: 5 }).then((res) => {
      this.ads = res.ads;
   }).catch((error) => {
      console.log("Native Error",error.message);
   });
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.initializeData();
      event.target.complete();
    }, 500);
  }
  
  initializeData(){
    if(this.isNetworkAvailable){
      this.getHomeData();
      this.getStoryList();
      this.getShortList();
      this.getTeamList();
    }
  }

  gotoPage(id:any){
    this.router.navigate(['home/articles',id,'all'])
  }

  gotoShorts(){
    this.router.navigate(['short'])
  }

  getHomeData(){
    this.loader = true;
    this.httpService.get(apiRoutes.home).subscribe({
      next: (v: any) => {
        this.loader = false;
        this.latestNews = v?.Latest_news
        this.category = v?.NewsByCategory_id;
        console.log(this.category)
        let category = []
        this.base_url = this.category[0].base_url
        for(var i=0; i < this.category.length; i++){
          if(this.category[i]){
            let val = {
              category_id:this.category[i]?.category_id,
              category:this.category[i]?.category
            }
            category.push(val)
          }
          for(var j=0; j< this.colorArray?.length; j++){
            this.category[i].colorCode = this.colorArray[i]
          }
          if(this.category[i]?.category == 'News'){
            this.newsCategory = this.category[i]
          }else if(this.category[i]?.category == 'Sports'){
            this.sportsCategory = this.category[i]
          }else if(this.category[i]?.category == 'Bussiness'){
            this.businessCategory = this.category[i]
          }else if(this.category[i]?.category == 'Entertainment'){
            this.entertainmentList = this.category[i]
          }
        }
        this.commonService.categories.emit(category)
        localStorage.setItem("category", JSON.stringify(category))
      },
      error: (e) => {
        this.loader = false;
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      },
      complete:()=>{
        this.loader = false;
        console.log("HI TREIGGERED 3 FALSE")
      }
    })
    console.log("loader3", this.loader)
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

  getShortList(){
    this.httpService.get(apiRoutes.shorts).subscribe({
      next:(v:any) =>{
        this.shortList = v?.response?.data;
        localStorage.setItem("shorts", JSON.stringify(this.shortList))
      },
      error:(e:any)=>{
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  getTeamList(){
    this.httpService.get(apiRoutes.team).subscribe({
      next:(v:any) =>{
        this.teamList = v?.response
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
