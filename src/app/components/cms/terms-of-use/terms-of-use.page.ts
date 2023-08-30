import { Component, OnInit } from '@angular/core';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.page.html',
  styleUrls: ['./terms-of-use.page.scss'],
})
export class TermsOfUsePage implements OnInit {
  pageContent:any;
  constructor(
    private httpService:HttpService
  ) { }

  ngOnInit() {
    this.getContent()
  }

  getContent(){
    let apiUrl = apiRoutes.about_us + '?page_name=Terms of Use'
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.pageContent = v.response
      },
      error:(e:any)=>{

      }
    })
  }

}
