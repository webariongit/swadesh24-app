import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-top-shows-box',
  templateUrl: './top-shows-box.component.html',
  styleUrls: ['./top-shows-box.component.scss'],
})
export class TopShowsBoxComponent  implements OnInit {
  @Input() shows:any
  @Input() baseUrl:any
  constructor(
    private router:Router,
    private httpService:HttpService,
    private commonService:CommonService
  ) { }

  ngOnInit() {}

  gotoShows(id:any){
    this.router.navigate(['shows', id])
  }

  followShow(id:any){
    var formData = new FormData();
    formData.append("id", id)
    this.httpService.post(apiRoutes.topShowsFollow, formData).subscribe({
      next:(v:any) =>{
        this.shows.user_follow_status = v.follow_status
        this.commonService.presentSuccessToast(v.message)
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
