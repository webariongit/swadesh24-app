import { Component, OnInit } from '@angular/core';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {
  pageContent:any;
  constructor(
    private httpService:HttpService
  ) { }

  ngOnInit() {
    this.getContent()
  }

  getContent(){
    let apiUrl = apiRoutes.about_us + '?page_name=Privacy Policy'
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.pageContent = v.response
      },
      error:(e:any)=>{

      }
    })
  }

}
