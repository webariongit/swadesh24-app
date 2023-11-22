import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.page.html',
  styleUrls: ['./polls.page.scss'],
})
export class PollsPage implements OnInit {
  pollList:any;
  constructor(
    private httpService:HttpService,
    private router:Router,
    private commonService:CommonService
  ) { 
    this.commonService.pollDataUpdated.subscribe(()=>{
      this.getPollList();
    })
  }

  ngOnInit() {
    this.getPollList();
  }

  getPollList(){
    this.httpService.get(apiRoutes.polls).subscribe({
      next:(v:any) =>{
        this.pollList = v?.response?.data
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
