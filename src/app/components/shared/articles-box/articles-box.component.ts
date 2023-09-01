import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles-box',
  templateUrl: './articles-box.component.html',
  styleUrls: ['./articles-box.component.scss'],
})
export class ArticlesBoxComponent  implements OnInit {
  @Input() news:any;
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
