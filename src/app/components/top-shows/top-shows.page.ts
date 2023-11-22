import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-top-shows',
  templateUrl: './top-shows.page.html',
  styleUrls: ['./top-shows.page.scss'],
})
export class TopShowsPage implements OnInit {
  topShows:any;
  base_url:any;
  constructor(
    private httpService:HttpService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getTopShows();
  }

  getTopShows(){
    this.httpService.get(apiRoutes.topShows).subscribe({
      next:(v:any) =>{
        this.base_url = v?.base_url;
        this.topShows = v?.response?.data;
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
