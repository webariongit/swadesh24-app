import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
 
  }

  gotoAuthorDetails(){
    this.router.navigate(['author-details'])
  }

}
