import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  aboutUs:any;
  loading:boolean = false;
  constructor(
    private httpService:HttpService,
    private commonService:CommonService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getAboutContent()
  }

  getAboutContent(){
    this.loading = true;
    let apiUrl = apiRoutes.about_us + '?page_name=About US'
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loading = false;
        this.aboutUs = v.response
      },
      error:(e:any)=>{
        this.loading = false;
        if (e.status == 401) {
          this.commonService.clearLocalStorage();
          this.router.navigate(['login']); 
        }
      }
    })
  }

}
