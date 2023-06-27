import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hastags-article',
  templateUrl: './hastags-article.page.html',
  styleUrls: ['./hastags-article.page.scss'],
})
export class HastagsArticlePage implements OnInit {
  pageTitle:any;
  segmentButton:any = 'news';
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pageTitle = this.activatedRoute.snapshot.params['page']
  }

}
