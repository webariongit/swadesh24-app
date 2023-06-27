import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  selectedTab:any;
  selectedCategoryTab:any = 'latest';
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

  ngOnInit() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        let pageType = event?.url.split('/')[2]
          this.selectedTab = pageType
          console.log("selected-tabs", this.selectedTab)
        }
    });
  }

}
