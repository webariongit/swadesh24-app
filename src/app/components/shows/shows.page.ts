import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.page.html',
  styleUrls: ['./shows.page.scss'],
})
export class ShowsPage implements OnInit {
  showsDetails:any;
  baseUrl:any;
  loader:boolean = false;
  constructor(
    private httpService:HttpService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {
    this.activatedRoute.params.subscribe((res)=>{
      let id = res["id"]
      this.getShowDetails(id)
    })
   }

  ngOnInit() {
  }

  getShowDetails(id:any){
    this.loader = !this.loader
    var formData = new FormData();
    formData.append("id", id)
    this.httpService.post(apiRoutes.topShowDetails, formData).subscribe({
      next:(v:any) =>{
        this.baseUrl =  v.base_url
        this.showsDetails = v.response
        this.loader = !this.loader
      },
      error:(e:any)=>{
        this.loader = !this.loader
        if (e.status == 401) {
          localStorage.clear();
          this.router.navigate(['login']); 
        }
      }
    })
  }

  followShow(id:any){
    var formData = new FormData();
    formData.append("id", id)
    this.httpService.post(apiRoutes.topShowsFollow, formData).subscribe({
      next:(v:any) =>{
        console.log("response", v)
        this.showsDetails.user_follow_status = v.follow_status
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
