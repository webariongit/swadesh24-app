import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdmobAds } from 'capacitor-admob-ads';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-state-articles',
  templateUrl: './state-articles.page.html',
  styleUrls: ['./state-articles.page.scss'],
})
export class StateArticlesPage implements OnInit {
  ads:any;
  loader:boolean = false;
  stateName:any;
  newsList:any;
  constructor(
    private httpService:HttpService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data)=>{
      this.stateName = data['state']
      this.getNewsList(data['id'])
    })
    this.getNativeAds();
  }

  getNativeAds(){
    AdmobAds.loadNativeAd({ adId: "ca-app-pub-8538744979078345/3308488337", isTesting: false, adsCount: 5 }).then((res) => {
      this.ads = res.ads;
   }).catch((error) => {
      console.log("Native Error",error.message);
   });
  }


  getNewsList(id:any){
    this.loader = true;
    this.newsList = [];
    let apiUrl = apiRoutes.news_list + '?state_id=' + id
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loader = false;
        this.newsList = v?.response
        console.log('Loading', this.newsList)
      },
      error:(e:any)=>{
        this.loader = false;
      },
      complete:()=>{
        this.loader = false;
      }
    })
  }

}
