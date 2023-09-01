import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entertainment-box',
  templateUrl: './entertainment-box.component.html',
  styleUrls: ['./entertainment-box.component.scss'],
})
export class EntertainmentBoxComponent  implements OnInit {
  @Input() entertainment:any
  
  constructor(
    private router:Router
  ) { }

  ngOnInit(
    
  ) {}

  gotoDetails(id:any){
    this.router.navigate(['article-details', id])
  }

  gotoAuthorDetails(id:any){
    this.router.navigate(['author-details', id])
  }
}
