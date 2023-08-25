import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    private domsanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    if(this.news.contents_type == 'youtube'){
      this.news.contents = this.domsanitizer.bypassSecurityTrustResourceUrl(this.news.contents)
    }
  }

  gotoDetails(){
    this.router.navigate(['article-details'])
  }
}
