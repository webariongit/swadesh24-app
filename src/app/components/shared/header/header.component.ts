import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  public pageLink = [
    { title: 'News', value: 'news'},
    { title: 'Sports', value: 'sports'},
    { title: 'Entertainment', value: 'entertaiment'},
    { title: 'Swadeshikash', value: 'swadeshikash'},
    { title: 'Technology', value: 'technology'},
    { title: 'Business', value: 'business'},
    { title: 'Health&Lifestyle', value: 'health'},
    { title: 'Investigation', value: 'investigation'},
    { title: 'Recruitment', value: 'recruitment'},
    { title: 'Politics', value: 'politics'},
  ];

  constructor(
    private router:Router
  ) { 
  }

  ngOnInit() {}

  gotoPage(value:any){
    this.router.navigate(['home/articles',value])
  }

  gotoSearch(){
    this.router.navigate(['search'])
  }

}
