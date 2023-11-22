import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shorts-box',
  templateUrl: './shorts-box.component.html',
  styleUrls: ['./shorts-box.component.scss'],
})
export class ShortsBoxComponent  implements OnInit {
  @Input() shorts:any;
  @Input() baseUrl:any;

  constructor(
    private router:Router,
  ) { }

  ngOnInit() {

  }

  showShorts(id:any){
    this.router.navigate(['shorts-details',id])
  }
  

}
