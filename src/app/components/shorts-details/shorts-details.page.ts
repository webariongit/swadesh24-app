import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-shorts-details',
  templateUrl: './shorts-details.page.html',
  styleUrls: ['./shorts-details.page.scss'],
})
export class ShortsDetailsPage implements OnInit {
 
  shortList:any;
  baseUrl:any;
  id:any;
  constructor(
    private router:Router,
    private httpService:HttpService,
    private activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((res)=>{
      this.id = res["id"]
    })
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.getShortList();
  }

  

  onSlideChange(id:any){

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
