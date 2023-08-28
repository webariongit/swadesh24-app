import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  categoryList:any;

  constructor(
    private router:Router,
    private httpService:HttpService
  ) { 
  }

  ngOnInit() {
    this.getCategoryList();
  }

  gotoPage(id:any){
    this.router.navigate(['home/articles',id,'all'])
  }

  gotoSearch(){
    this.router.navigate(['search'])
  }

  getCategoryList(){
    this.httpService.get(apiRoutes.category).subscribe({
      next:(v:any) =>{
        this.categoryList = v?.message
      },
      error:(e:any)=>{

      }
    })
  }

}
