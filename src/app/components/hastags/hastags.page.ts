import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hastags',
  templateUrl: './hastags.page.html',
  styleUrls: ['./hastags.page.scss'],
})
export class HastagsPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  gotoPage(page:any){
    this.router.navigate(['hastags',page])
  }

}
