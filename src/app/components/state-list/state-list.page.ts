import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/service/common-service/common.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.page.html',
  styleUrls: ['./state-list.page.scss'],
})
export class StateListPage implements OnInit {

  @Input() stateList:any;
  results:any;

  constructor(
    private modalCtrl:ModalController,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    this.results = [...this.stateList];
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  searchState(event:any){
    const query = event.target.value.toString().toLowerCase();
    this.results = this.stateList.filter((d:any) => d.name.toString().toLowerCase().indexOf(query) > -1);
    console.log('result', this.results)
  }

  selectState(name:any){
    this.commonService.selectedState.emit(name.name);
    this.modalCtrl.dismiss();
  }

}
