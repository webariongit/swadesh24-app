import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-box',
  templateUrl: './news-box.component.html',
  styleUrls: ['./news-box.component.scss'],
})
export class NewsBoxComponent  implements OnInit {
  @Input() news:any;
  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
    
  }

  gotoDetails(id:any){
    this.router.navigate(['article-details', id])
  }

  gotoAuthorDetails(id:any){

  }
}
