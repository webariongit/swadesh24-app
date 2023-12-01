import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  categoryList:any;
  loader:boolean = false;
  selectedCategory:any;
  liveUrl:any;
  constructor(
    private router:Router,
    private commonService:CommonService,
    private httpService:HttpService
  ) {
    this.commonService.categories.subscribe((data)=>{
      this.categoryList = data;
    })

    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let pageType = event?.url.split('/')[3];
        if(pageType == '0' || !pageType){
          const segmentButton = document.querySelector('.segment-button-checked');
          if (segmentButton) {
            segmentButton.classList.remove('segment-button-checked');
          }
          console.log("True",this.selectedCategory)
        }
      }
    });

  }

  gotoLive(){
    let apiUrl = apiRoutes.live
    this.httpService.get(apiUrl).subscribe({
      next:async (v:any) =>{
        this.liveUrl = v.url;
        if(this.liveUrl){
          await Browser.open({ url: this.liveUrl });
        }else{
          await Browser.open({ url: 'https://www.youtube.com/@Swadesh24Newschannel'});
        }
      },
      error:(e:any)=>{
        this.loader = false;
      }
    })
  }

  ngOnInit() {
    let category:any = localStorage.getItem('category')
    this.categoryList = JSON.parse(category)
  }

  gotoPage(id:any){
    this.router.navigate(['home/articles',id,'all'])
  }

  gotoSearch(){
    this.router.navigate(['search'])
  }


}
