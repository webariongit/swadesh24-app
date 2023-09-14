import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
  constructor(
    private router:Router,
    private commonService:CommonService
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
