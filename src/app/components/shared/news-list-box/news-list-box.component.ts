import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list-box',
  templateUrl: './news-list-box.component.html',
  styleUrls: ['./news-list-box.component.scss'],
})
export class NewsListBoxComponent  implements OnInit {
  @Input() news:any;
  @Input() baseUrl:any;
  @Input() authorNews:boolean = false;
  
  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  gotoDetails(id:any){
    this.router.navigate(['article-details', id])
  }

  gotoAuthorDetails(id:any){
    this.router.navigate(['author-details', id])
  }

}
