import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  KeyWord:any;
  searchResult:any = null;
  loading:boolean = false;
  articleList:any = null;
  authorList:any = null;
  categoryList:any = null;
  constructor(
    private httpService:HttpService,
    private router:Router
  ) { }

  ngOnInit() {

  }

  async searchArticle() {
    var formData = new FormData()
    formData.append("search", this.KeyWord)
    this.loading = true;
    this.httpService.post(apiRoutes.search, formData).subscribe({
      next:(v:any) =>{
        this.loading = false;
        this.searchResult = v['data'];
        let obj = Object.entries(this.searchResult)
        let author:any;
        let news:any;
        let category:any;
        for(var i=0; i < obj.length; i++){
          if(obj[i][0] == 'users'){
            author = obj[i][1]
            this.authorList = author?.data
          }else if(obj[i][0] == 'news'){
            news = obj[i][1]
            this.articleList = news?.data
          }else if(obj[i][0] == 'categories'){
            category = obj[i][1]
            this.categoryList = category?.data
          }
        }
      },
      error:(e:any)=>{
        this.loading = false;
        console.log("error", e)
      }
    })
  }

  gotoPage(page:any, id:any){
    this.router.navigate([page, id])
  }

  gotoArticleList(id:any){
    this.router.navigate(['home/articles',id,'all'])
  }

}
