import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  selectedCategoryTab:any = 'latest';
  categoryId:number = 0;
  subcategoryList:any
  newsList:any;
  loader:boolean = false;
  loader2:boolean = false;
  contentType:any;
  contentTypeNews:any;

  constructor(
    private router:Router,
    private httpService:HttpService,
    private activatedRoute:ActivatedRoute,
    private commonService:CommonService
  ) { 
    this.activatedRoute.params.subscribe((params)=>{
      console.log("params", params)
      this.categoryId = params['id'];
      this.contentType = params['value']
      if(this.categoryId != 0){
        this.getSubCategories(this.categoryId)
      }else{
        this.getNewsTypeList(this.contentType)
      }
    })
  }

  ngOnInit() {

  }

  gotoSearch(){
    this.router.navigate(['search'])
  }

  getSubCategories(id:any){
    this.loader2 = true;
    let apiUrl = apiRoutes.subcategory_list + '?category_id=' + id;
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loader2 = false;
        this.subcategoryList = v?.message
        this.selectedCategoryTab = this.subcategoryList[0]?.id;
        this.getNewsList(this.subcategoryList[0]?.id)
      },
      error:(e:any)=>{
        this.loader2 = false;
      },
      complete:()=>{
        this.loader2 = false;
      }
    })
  }

  getNewsList(id:any){
    this.loader = true;
    this.newsList = [];
    this.contentTypeNews = [];
    let apiUrl = apiRoutes.news_list + '?subcategory_id=' + id
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loader = false;
        this.newsList = v?.response
        console.log('Loading', this.loader)
      },
      error:(e:any)=>{
        this.loader = false;
      },
      complete:()=>{
        this.loader = false;
      }
    })
  }

  getNewsTypeList(value:any){
    this.loader = true;
    this.newsList = [];
    this.contentTypeNews = [];
    let apiUrl = apiRoutes.content_type_details + '?content_type=' + value
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loader = false;
        this.contentTypeNews = v?.response
        console.log('Loading', this.loader)
      },
      error:(e:any)=>{
        this.loader = false;
      },
      complete:()=>{
        this.loader = false;
      }
    })
  }

  tabChange(){
    this.getNewsList(this.selectedCategoryTab)
  }

}
