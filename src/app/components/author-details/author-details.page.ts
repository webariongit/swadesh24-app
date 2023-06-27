import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.page.html',
  styleUrls: ['./author-details.page.scss'],
})
export class AuthorDetailsPage implements OnInit {
  segmentButton:any = 'news';
  constructor() { }

  ngOnInit() {
  }

}
