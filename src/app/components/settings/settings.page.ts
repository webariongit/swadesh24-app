import {  Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Share, ShareOptions } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  CopyInputText:string = "https://play.google.com/store/apps/details?id=com.aajtakbharat.app";
  rating:any = 5;
  constructor(
    // private clipboard: Clipboard
    private router:Router,
    private httpService:HttpService,
    private commonService:CommonService,
    private modal:ModalController
  ) { }

  ngOnInit() {

  }

  copyString(){
    // this.clipboard.copy(this.CopyInputText)
  }

  gotoPage(page:any){
    this.router.navigate([page])
  }

  submit(){
    var formData = new FormData()
    formData.append('ratings', this.rating)
    this.httpService.post(apiRoutes.rating, formData).subscribe({
      next:(v:any) =>{
        this.commonService.presentSuccessToast(v.message)
        this.modal.dismiss()
      },
      error:(e:any)=>{
        this.commonService.presentFailureToast(e.message)
      }
    })
  }

  async shareNews(){
    const options:ShareOptions={
      title: "Swadesh 24 App",
      dialogTitle: 'Share with friends',
      url:'https://play.google.com/store/apps/details?id=com.aajtakbharat.app',
    }
    await Share.share(options).then((res:any)=>{
      console.log("error",res)
    }).catch((error)=>{
      console.log("error",error)
    })
  }

}
