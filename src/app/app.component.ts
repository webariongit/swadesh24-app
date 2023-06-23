import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home/all', icon: 'home' },
    { title: 'Stories', url: '/stories', icon: 'play' },
    { title: 'My Profile', url: '/my-profile', icon: 'person' },
    { title: 'Hastags', url: '/hastags', icon: 'extension-puzzle' },
    { title: 'Bookmarks', url: '/bookmarks', icon: 'bookmark' },
    { title: 'Setting', url: '/setting', icon: 'settings' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ];
  constructor() {}
}
