import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-box',
  templateUrl: './team-box.component.html',
  styleUrls: ['./team-box.component.scss'],
})
export class TeamBoxComponent  implements OnInit {
  @Input() baseUrl:any;
  @Input() team:any;

  constructor() { }

  ngOnInit() {}

}
