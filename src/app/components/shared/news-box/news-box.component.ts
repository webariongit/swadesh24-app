import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-box',
  templateUrl: './news-box.component.html',
  styleUrls: ['./news-box.component.scss'],
})
export class NewsBoxComponent  implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  gotoDetails(){
    this.router.navigate(['article-details'])
  }
}
