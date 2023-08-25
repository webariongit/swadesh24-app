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
  
  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  gotoDetails(){
    this.router.navigate(['article-details'])
  }

}
