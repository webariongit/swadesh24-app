import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  selectedCategoryTab:any = 'latest';

  constructor(
    private router:Router
  ) { 
    
  }

  ngOnInit() {
  }

  gotoSearch(){
    this.router.navigate(['search'])
  }

}
