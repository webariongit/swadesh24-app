import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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
  constructor(
    private router:Router,
    private commonService:CommonService
  ) {
    this.commonService.categories.subscribe((data)=>{
      this.categoryList = data;
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
