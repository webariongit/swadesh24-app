import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HttpService } from './service/http-service/http.service';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/home/all', icon: 'home' },
    { title: 'Stories', url: '/stories', icon: 'play' },
    { title: 'My Profile', url: '/my-profile', icon: 'person' },
    { title: 'Hastags', url: '/hastags', icon: 'extension-puzzle' },
    { title: 'Bookmarks', url: '/bookmarks', icon: 'bookmark' },
    { title: 'Setting', url: '/settings', icon: 'settings' },
  ];
  constructor(
    private httpService:HttpService
  ) {}

  ngOnInit(): void {
    this.httpService.setHeader();
  }
}
