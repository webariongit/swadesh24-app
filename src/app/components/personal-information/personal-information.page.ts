import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { apiRoutes } from 'src/app/constant/config';
import { CountryListPage } from '../country-list/country-list.page';
import { ModalController } from '@ionic/angular';
import { StateListPage } from '../state-list/state-list.page';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  validationForm:FormGroup
  loading:boolean = false;
  userDetails:any;
  stateList:any;
  contryList:any;
  id:any;
  validationMessages = {
    first_name: [
      {
        type: 'required',
        message: 'First Name is required',
      },
    ],
    last_name: [
      {
        type: 'required',
        message: 'Last Name is required',
      },
    ],
    age: [
      {
        type: 'required',
        message: 'Age is required',
      },
    ],
    gender: [
      {
        type: 'required',
        message: 'Gender is required',
      },
    ],
    state: [
      {
        type: 'required',
        message: 'State is required',
      },
    ],
    country: [
      {
        type: 'required',
        message: 'Country is required',
      },
    ]
  };


  constructor(
    private formBuilder:FormBuilder,
    private httpClient:HttpClient,
    private httpService:HttpService,
    private modalCtrl:ModalController,
    private commonService:CommonService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.commonService.selectedCountry.subscribe((data)=>{
      this.validationForm.controls['country'].setValue(data)
      this.getStateList(data)
    })
    this.commonService.selectedState.subscribe((data)=>{
      this.validationForm.controls['state'].setValue(data)
    })
    this.activatedRoute.params.subscribe((params)=>{
      this.id = params['id']
    })
   }



  ngOnInit() {
    this.validationForm = this.formBuilder.group({
      first_name:['', Validators.required],
      last_name:['', Validators.required],
      age:['', Validators.required],
      gender:['', Validators.required],
      address:'',
      state:['', Validators.required],
      country:['', Validators.required],
    })
    let userData:any = localStorage.getItem('userDetails');
    this.userDetails = JSON.parse(userData)
    if(this.userDetails){
      this.setFormData(this.userDetails)
    }
    this.getCountryList()
  }

  setFormData(userDetails:any){
    this.validationForm.controls['first_name'].setValue(userDetails?.first_name)
    this.validationForm.controls['last_name'].setValue(userDetails?.last_name)
    this.validationForm.controls['age'].setValue(userDetails?.age)
    this.validationForm.controls['gender'].setValue(userDetails?.gender)
    this.validationForm.controls['address'].setValue(userDetails?.address)
    this.validationForm.controls['state'].setValue(userDetails?.state)
    this.validationForm.controls['country'].setValue(userDetails?.country)
    if(userDetails?.country){
      this.getStateList(userDetails?.country)
    }
  }

  submitForm(){
    this.httpService.post(apiRoutes.user_information, this.validationForm.value).subscribe({
      next:(v:any)=>{
        console.log(v)
        if(v.status == 201){
          this.httpService.updateUserDetails();
          this.commonService.userLoggedIn.emit()
          this.router.navigate(['home'])
          if(v.message){
            this.commonService.presentSuccessToast(v.message);
          }else if(v.response){
            this.commonService.presentSuccessToast(v.response);
          }
        }else{
          if(v.message){
            this.commonService.presentFailureToast(v.message);
          }else if(v.response){
            this.commonService.presentSuccessToast(v.response);
          }
        }
      },
      error: (e) => {
        console.log(e)
        this.commonService.presentFailureToast(e?.error?.message);
        if (e.status == 401) {
          this.commonService.clearLocalStorage();
        }
      },
    })
  }

  getCountryList(){
    this.httpClient.get(apiRoutes.get_state).subscribe((res:any)=>{
      this.contryList = res['data']
    })
  }

  getStateList(country:string){
    this.loading = true;
    let formData = {
      "country":country
    }
    this.httpClient.post(apiRoutes.get_state, formData).subscribe((res:any)=>{
      this.stateList = res['data']?.states
      this.loading = false;
    })
  }

  async selectCountry(countryList:any) {
    const modal = await this.modalCtrl.create({
      component: CountryListPage,
      componentProps: {
        countryList
      }
    });
    modal.present();
  }

  async selectState(stateList:any){
    const modal = await this.modalCtrl.create({
      component: StateListPage,
      componentProps: {
        stateList
      }
    });
    modal.present();
  }

  gobackToArticle(){
    this.router.navigate(['article-details', this.id])
  }

}
