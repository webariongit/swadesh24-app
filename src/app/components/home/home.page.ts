import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public sliderData = [
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"},
    {img:"../../../assets/img/avatar.png"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
