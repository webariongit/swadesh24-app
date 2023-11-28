import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-short-slider',
  templateUrl: './short-slider.page.html',
  styleUrls: ['./short-slider.page.scss'],
})
export class ShortSliderPage implements OnInit {
  baseUrl:any;
  shortList:any;

  constructor(
    private httpService:HttpService,
    private router:Router
  ) { }
  
  ionViewDidEnter(){
    this.getShortList()
  }

  ngOnInit() {
    
  }

  getShortList(){
    this.httpService.get(apiRoutes.shorts).subscribe({
      next:(v:any) =>{
        this.baseUrl = v.base_path;
        this.shortList = v?.response?.data;
        console.log(this.shortList)
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
