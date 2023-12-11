import { Component, Input, OnInit } from '@angular/core';
import { Share, ShareOptions } from '@capacitor/share';
import { apiRoutes } from 'src/app/constant/config';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-share-btn',
  templateUrl: './share-btn.component.html',
  styleUrls: ['./share-btn.component.scss'],
})
export class ShareBtnComponent  implements OnInit {
  @Input() news:any;
  
  constructor(
    private httpService:HttpService
  ) { }

  ngOnInit() {}

  async shareNews(news:any){
    const options:ShareOptions={
      title: news?.title,
      text: news?.sub_title,
      dialogTitle: 'Share with friends',
      url:'https://web-stories.aajtakbharat.co/article-details?news_id=' + news?.id,
    }
    await Share.share(options).then((res:any)=>{
      this.newsShared(news?.id)
    }).catch((error)=>{
      console.log("error",error)
    })
  }
  
  newsShared(id:any){
    let formData = new FormData();
    formData.append("news_id", id)
    let apiUrl = apiRoutes.news_share;
    this.httpService.post(apiUrl, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
      },
      error:(e:any)=>{
        console.log(e)
      }
    })
  }

}
