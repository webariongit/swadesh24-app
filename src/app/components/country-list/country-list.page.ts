import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/service/common-service/common.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
})
export class CountryListPage implements OnInit {

  @Input() countryList:any;
  results:any;

  constructor(
    private modalCtrl:ModalController,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    this.results = [...this.countryList];
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  searchState(event:any){
    const query = event.target.value.toString().toLowerCase();
    this.results = this.countryList.filter((d:any) => d.name.toString().toLowerCase().indexOf(query) > -1);
    console.log('result', this.results)
  }

  selectCountry(name:any){
    this.commonService.selectedCountry.emit(name.name);
    this.modalCtrl.dismiss();
  }
  

  
}
