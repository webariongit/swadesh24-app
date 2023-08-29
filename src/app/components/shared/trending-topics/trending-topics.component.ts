import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending-topics',
  templateUrl: './trending-topics.component.html',
  styleUrls: ['./trending-topics.component.scss'],
})
export class TrendingTopicsComponent  implements OnInit {
  @Input() category:any
  @Input() index:any;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {

  }

  gotoPage(id:any){
    this.router.navigate(['home/articles',id,'all'])
  }

}
