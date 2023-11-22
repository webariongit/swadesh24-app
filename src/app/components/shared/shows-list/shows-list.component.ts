import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent  implements OnInit {
  @Input() shows:any;
  @Input() baseUrl:any;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {}


  showDetails(id:any){
    this.router.navigate(['shows-details', id])
  }

}
