import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  validationForm:FormGroup
  validation_messages = {
    feedbacktype: [
      {
        type: 'required',
        message: 'Feedback Type is required',
      },
    ],
    feedback: [
      {
        type: 'required',
        message: 'Feedback is required',
      },
    ]
  };
  constructor(
    private httpService:HttpService,
    private commonService:CommonService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.validationForm = this.formBuilder.group({
      feedbacktype:['', Validators.required],
      feedback:['', Validators.required]
    })
  }

  submit(){
    const formValue = this.validationForm.value
    var formData = new FormData()
    formData.append('feedback_type', formValue.feedbacktype)
    formData.append('feed', formValue.feedback)
    formData.append('status', '1')
    this.httpService.post(apiRoutes.feedback, formData).subscribe({
      next:(v:any) =>{
        if(v.status == '201'){
          this.commonService.presentSuccessToast(v.message)
          this.router.navigate(['settings'])
        }else{
          this.commonService.presentFailureToast(v.message)
        }
      },
      error:(e:any)=>{
        this.commonService.presentFailureToast(e.message)
      }
    })
  }

  
}
