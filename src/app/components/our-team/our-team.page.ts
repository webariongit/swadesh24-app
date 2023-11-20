import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.page.html',
  styleUrls: ['./our-team.page.scss'],
})
export class OurTeamPage implements OnInit {
  teamCategory:any;
  selectedCategoryTab:any;
  base_url:any;
  constructor(
    private httpService:HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTeamList();
  }

  // tabChange(){
  //   this.getNewsList(this.selectedCategoryTab)
  // }

  getTeamList(){
    this.httpService.get(apiRoutes.team_category_wise).subscribe({
      next:(v:any) =>{
        this.base_url = v?.base_url;
        this.teamCategory = v?.response;
        this.selectedCategoryTab = this.teamCategory[0].name
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
