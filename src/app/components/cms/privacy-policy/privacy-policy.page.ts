import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {
  pageContent:any;
  loading:boolean = false;
  constructor(
    private httpService:HttpService,
    private commonService:CommonService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getContent()
  }

  getContent(){
    this.loading = true;
    let apiUrl = apiRoutes.about_us + '?page_name=Privacy Policy'
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loading = false;
        this.pageContent = v.response
      },
      error:(e:any)=>{
        this.loading = false;
        console.log(e)
        if (e.status == 401) {
          this.commonService.clearLocalStorage();
          this.router.navigate(['login']); 
        }
      }
    })
  }

}
