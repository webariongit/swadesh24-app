import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-hastags',
  templateUrl: './hastags.page.html',
  styleUrls: ['./hastags.page.scss'],
})
export class HastagsPage implements OnInit {
  currentPage:number = 1
  followedHastagList:any;
  loading:boolean  = false;
  unfollowedHastagList:any;
  listFollowed:number = 5;
  listfollow:number = 5;
  

  constructor(
    private router:Router,
    private httpService:HttpService,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    this.getHstagList();
  }

  gotoPage(id:any){
    this.router.navigate(['hastags',id])
  }

  getHstagList(){
    this.followedHastagList = [];
    this.unfollowedHastagList = [];
    let apiUrl = apiRoutes.hastag_list + '?page=' + this.currentPage
    this.loading = true;
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loading = false;
        let hastag = v.response;
        for(var i=0; i < hastag?.length; i++){
          if(hastag[i]?.follows === 1){
            this.followedHastagList.push(hastag[i])
          }else{
            this.unfollowedHastagList.push(hastag[i])
          }
        }
      },
      error:(e:any)=>{
        this.loading = false;
        console.log(e)
      }
    })
  }

  viewAllList(length:any, listType:any){
    if(listType == 'follow'){
      this.listfollow = Number(length);
    }else if(listType == 'followed'){
      this.listFollowed = Number(length);
    }
  }

  followHastag(hastag:any){
    if(hastag?.follows == 1){
      var apiUrl = apiRoutes.hastag_follow_unfollow + '?hashtag_id=' + hastag?.id + '&follow=' + 0
    }else{
      var apiUrl = apiRoutes.hastag_follow_unfollow + '?hashtag_id=' + hastag?.id + '&follow=' + 1
    }
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.getHstagList();
        this.commonService.presentSuccessToast(v.message)
      },
      error:(e:any)=>{
        this.commonService.presentFailureToast(e.message)
      }
    })
  }

}
