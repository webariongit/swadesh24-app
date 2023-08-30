import { Component, OnInit } from '@angular/core';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  aboutUs:any;
  constructor(
    private httpService:HttpService
  ) { }

  ngOnInit() {
    this.getAboutContent()
  }

  getAboutContent(){
    let apiUrl = apiRoutes.about_us + '?page_name=About US'
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.aboutUs = v.response
        console.log("about us content", v)
      },
      error:(e:any)=>{
        console.log("about us", e)
      }
    })
  }

}
