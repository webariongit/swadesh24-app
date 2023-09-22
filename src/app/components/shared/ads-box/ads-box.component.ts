import { Component, Input, OnInit } from '@angular/core';
import { AdmobAds } from 'capacitor-admob-ads';

@Component({
  selector: 'app-ads-box',
  templateUrl: './ads-box.component.html',
  styleUrls: ['./ads-box.component.scss'],
})
export class AdsBoxComponent  implements OnInit {
  @Input() adDetails:any
  constructor() { }

  ngOnInit() {

  }

  openAd(id:any){
    AdmobAds.triggerNativeAd({id:id})
  }

}
