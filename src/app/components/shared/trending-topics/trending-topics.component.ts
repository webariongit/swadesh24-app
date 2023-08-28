import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-topics',
  templateUrl: './trending-topics.component.html',
  styleUrls: ['./trending-topics.component.scss'],
})
export class TrendingTopicsComponent  implements OnInit {
  @Input() category:any
  @Input() index:any;
  constructor() { }

  ngOnInit() {

  }

}
