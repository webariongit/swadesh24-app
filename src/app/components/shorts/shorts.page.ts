import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';
import Swiper from 'swiper';
@Component({
  selector: 'app-shorts',
  templateUrl: './shorts.page.html',
  styleUrls: ['./shorts.page.scss'],
})
export class ShortsPage implements OnInit {

  shortList:any
  base_url:any;
  loader:boolean = false;
  constructor(
    private httpService:HttpService,
    private router:Router,
  ) { }
  
  ionViewDidEnter(){
    this.getShortList()
  }

  ngOnInit() {
    
  }

  getShortList(){
    this.loader = true;
    this.httpService.get(apiRoutes.shorts).subscribe({
      next:(v:any) =>{
        this.base_url =  v.base_path
        this.shortList = v?.response?.data
        this.loader = false;
      },
      error:(e:any)=>{
        this.loader = false;
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }


}
