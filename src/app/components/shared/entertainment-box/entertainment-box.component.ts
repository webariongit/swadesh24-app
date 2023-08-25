import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entertainment-box',
  templateUrl: './entertainment-box.component.html',
  styleUrls: ['./entertainment-box.component.scss'],
})
export class EntertainmentBoxComponent  implements OnInit {
  @Input() entertainment:any
  
  constructor() { }

  ngOnInit() {}

}
