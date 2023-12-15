import { Component, Input, OnInit } from '@angular/core';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-polls-box',
  templateUrl: './polls-box.component.html',
  styleUrls: ['./polls-box.component.scss'],
})
export class PollsBoxComponent  implements OnInit {
  @Input() poll:any;
  
  constructor(
    private httpService:HttpService,
    private commonService:CommonService
  ) { }

  ngOnInit() {

  }

  chooseOption(id:any ,option:any){
    var formData = new FormData();
    formData.append("poll_id", id)
    formData.append("choice", option)
    this.httpService.post(apiRoutes.pollsParticipate, formData).subscribe({
      next:(v:any) =>{
        console.log(v)
        this.commonService.pollDataUpdated.emit()
        if(v.error.message){
          this.commonService.presentFailureToast(v.error.message)
        }
      },
      error:(e:any)=>{
        console.log(e)
      }
    })
  }
}
