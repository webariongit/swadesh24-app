import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-author-short-details',
  templateUrl: './author-short-details.page.html',
  styleUrls: ['./author-short-details.page.scss'],
})
export class AuthorShortDetailsPage implements OnInit {
  authorDetails:any;
  shorts:any;
  loading:any;
  baseUrl:any;
  constructor(
    private httpService:HttpService,
    private activatedRoute:ActivatedRoute,
    private commonService:CommonService,
    private router:Router
  ) { 
    this.activatedRoute.params.subscribe((res)=>{
      let id = res["id"]
      this.getAuthorDetails(id)
    })
  }

  ngOnInit() {
  }

  getAuthorDetails(id:any){
    this.loading = true;
    let apiUrl = apiRoutes.author_details + '?author_id=' + id;
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loading = false;
        this.authorDetails = v?.response;
        this.shorts = v?.shorts;
      },
      error:(e:any)=>{
        this.loading = false;
        console.log("error", e)
      }
    })
  }

  followAuthor(id:any, status:any){
    var formData = new FormData();
    formData.append("author_id", id)
    this.httpService.post(apiRoutes.authorFollow, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
        this.commonService.presentSuccessToast(v.message)
        if(status == 0){
          this.authorDetails.author_follow_status = 1
        }else{
          this.authorDetails.author_follow_status = 0
        }
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
