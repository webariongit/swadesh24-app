import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiRoutes } from 'src/app/constant/config';
import { CommonService } from 'src/app/service/common-service/common.service';
import { HttpService } from 'src/app/service/http-service/http.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import {
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';
import { MenuController } from '@ionic/angular';

const FACEBOOK_PERMISSIONS = [
  'email',
  'user_birthday',
  'user_photos',
  'user_gender',
];

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationForm:FormGroup;
  mobileCountryCode:any = [
    {
      code: "+7 840",
      name: "Abkhazia"
    },
    {
      code: "+93",
      name: "Afghanistan"
    },
    {
      code: "+355",
      name: "Albania"
    },
    {
      code: "+213",
      name: "Algeria"
    },
    {
      code: "+1 684",
      name: "American Samoa"
    },
    {
      code: "+376",
      name: "Andorra"
    },
    {
      code: "+244",
      name: "Angola"
    },
    {
      code: "+1 264",
      name: "Anguilla"
    },
    {
      code: "+1 268",
      name: "Antigua and Barbuda"
    },
    {
      code: "+54",
      name: "Argentina"
    },
    {
      code: "+374",
      name: "Armenia"
    },
    {
      code: "+297",
      name: "Aruba"
    },
    {
      code: "+247",
      name: "Ascension"
    },
    {
      code: "+61",
      name: "Australia"
    },
    {
      code: "+672",
      name: "Australian External Territories"
    },
    {
      code: "+43",
      name: "Austria"
    },
    {
      code: "+994",
      name: "Azerbaijan"
    },
    {
      code: "+1 242",
      name: "Bahamas"
    },
    {
      code: "+973",
      name: "Bahrain"
    },
    {
      code: "+880",
      name: "Bangladesh"
    },
    {
      code: "+1 246",
      name: "Barbados"
    },
    {
      code: "+1 268",
      name: "Barbuda"
    },
    {
      code: "+375",
      name: "Belarus"
    },
    {
      code: "+32",
      name: "Belgium"
    },
    {
      code: "+501",
      name: "Belize"
    },
    {
      code: "+229",
      name: "Benin"
    },
    {
      code: "+1 441",
      name: "Bermuda"
    },
    {
      code: "+975",
      name: "Bhutan"
    },
    {
      code: "+591",
      name: "Bolivia"
    },
    {
      code: "+387",
      name: "Bosnia and Herzegovina"
    },
    {
      code: "+267",
      name: "Botswana"
    },
    {
      code: "+55",
      name: "Brazil"
    },
    {
      code: "+246",
      name: "British Indian Ocean Territory"
    },
    {
      code: "+1 284",
      name: "British Virgin Islands"
    },
    {
      code: "+673",
      name: "Brunei"
    },
    {
      code: "+359",
      name: "Bulgaria"
    },
    {
      code: "+226",
      name: "Burkina Faso"
    },
    {
      code: "+257",
      name: "Burundi"
    },
    {
      code: "+855",
      name: "Cambodia"
    },
    {
      code: "+237",
      name: "Cameroon"
    },
    {
      code: "+1",
      name: "Canada"
    },
    {
      code: "+238",
      name: "Cape Verde"
    },
    {
      code: "+ 345",
      name: "Cayman Islands"
    },
    {
      code: "+236",
      name: "Central African Republic"
    },
    {
      code: "+235",
      name: "Chad"
    },
    {
      code: "+56",
      name: "Chile"
    },
    {
      code: "+86",
      name: "China"
    },
    {
      code: "+61",
      name: "Christmas Island"
    },
    {
      code: "+61",
      name: "Cocos-Keeling Islands"
    },
    {
      code: "+57",
      name: "Colombia"
    },
    {
      code: "+269",
      name: "Comoros"
    },
    {
      code: "+242",
      name: "Congo"
    },
    {
      code: "+243",
      name: "Congo, Dem. Rep. of (Zaire)"
    },
    {
      code: "+682",
      name: "Cook Islands"
    },
    {
      code: "+506",
      name: "Costa Rica"
    },
    {
      code: "+385",
      name: "Croatia"
    },
    {
      code: "+53",
      name: "Cuba"
    },
    {
      code: "+599",
      name: "Curacao"
    },
    {
      code: "+537",
      name: "Cyprus"
    },
    {
      code: "+420",
      name: "Czech Republic"
    },
    {
      code: "+45",
      name: "Denmark"
    },
    {
      code: "+246",
      name: "Diego Garcia"
    },
    {
      code: "+253",
      name: "Djibouti"
    },
    {
      code: "+1 767",
      name: "Dominica"
    },
    {
      code: "+1 809",
      name: "Dominican Republic"
    },
    {
      code: "+670",
      name: "East Timor"
    },
    {
      code: "+56",
      name: "Easter Island"
    },
    {
      code: "+593",
      name: "Ecuador"
    },
    {
      code: "+20",
      name: "Egypt"
    },
    {
      code: "+503",
      name: "El Salvador"
    },
    {
      code: "+240",
      name: "Equatorial Guinea"
    },
    {
      code: "+291",
      name: "Eritrea"
    },
    {
      code: "+372",
      name: "Estonia"
    },
    {
      code: "+251",
      name: "Ethiopia"
    },
    {
      code: "+500",
      name: "Falkland Islands"
    },
    {
      code: "+298",
      name: "Faroe Islands"
    },
    {
      code: "+679",
      name: "Fiji"
    },
    {
      code: "+358",
      name: "Finland"
    },
    {
      code: "+33",
      name: "France"
    },
    {
      code: "+596",
      name: "French Antilles"
    },
    {
      code: "+594",
      name: "French Guiana"
    },
    {
      code: "+689",
      name: "French Polynesia"
    },
    {
      code: "+241",
      name: "Gabon"
    },
    {
      code: "+220",
      name: "Gambia"
    },
    {
      code: "+995",
      name: "Georgia"
    },
    {
      code: "+49",
      name: "Germany"
    },
    {
      code: "+233",
      name: "Ghana"
    },
    {
      code: "+350",
      name: "Gibraltar"
    },
    {
      code: "+30",
      name: "Greece"
    },
    {
      code: "+299",
      name: "Greenland"
    },
    {
      code: "+1 473",
      name: "Grenada"
    },
    {
      code: "+590",
      name: "Guadeloupe"
    },
    {
      code: "+1 671",
      name: "Guam"
    },
    {
      code: "+502",
      name: "Guatemala"
    },
    {
      code: "+224",
      name: "Guinea"
    },
    {
      code: "+245",
      name: "Guinea-Bissau"
    },
    {
      code: "+595",
      name: "Guyana"
    },
    {
      code: "+509",
      name: "Haiti"
    },
    {
      code: "+504",
      name: "Honduras"
    },
    {
      code: "+852",
      name: "Hong Kong SAR China"
    },
    {
      code: "+36",
      name: "Hungary"
    },
    {
      code: "+354",
      name: "Iceland"
    },
    {
      code: "+91",
      name: "India"
    },
    {
      code: "+62",
      name: "Indonesia"
    },
    {
      code: "+98",
      name: "Iran"
    },
    {
      code: "+964",
      name: "Iraq"
    },
    {
      code: "+353",
      name: "Ireland"
    },
    {
      code: "+972",
      name: "Israel"
    },
    {
      code: "+39",
      name: "Italy"
    },
    {
      code: "+225",
      name: "Ivory Coast"
    },
    {
      code: "+1 876",
      name: "Jamaica"
    },
    {
      code: "+81",
      name: "Japan"
    },
    {
      code: "+962",
      name: "Jordan"
    },
    {
      code: "+7 7",
      name: "Kazakhstan"
    },
    {
      code: "+254",
      name: "Kenya"
    },
    {
      code: "+686",
      name: "Kiribati"
    },
    {
      code: "+965",
      name: "Kuwait"
    },
    {
      code: "+996",
      name: "Kyrgyzstan"
    },
    {
      code: "+856",
      name: "Laos"
    },
    {
      code: "+371",
      name: "Latvia"
    },
    {
      code: "+961",
      name: "Lebanon"
    },
    {
      code: "+266",
      name: "Lesotho"
    },
    {
      code: "+231",
      name: "Liberia"
    },
    {
      code: "+218",
      name: "Libya"
    },
    {
      code: "+423",
      name: "Liechtenstein"
    },
    {
      code: "+370",
      name: "Lithuania"
    },
    {
      code: "+352",
      name: "Luxembourg"
    },
    {
      code: "+853",
      name: "Macau SAR China"
    },
    {
      code: "+389",
      name: "Macedonia"
    },
    {
      code: "+261",
      name: "Madagascar"
    },
    {
      code: "+265",
      name: "Malawi"
    },
    {
      code: "+60",
      name: "Malaysia"
    },
    {
      code: "+960",
      name: "Maldives"
    },
    {
      code: "+223",
      name: "Mali"
    },
    {
      code: "+356",
      name: "Malta"
    },
    {
      code: "+692",
      name: "Marshall Islands"
    },
    {
      code: "+596",
      name: "Martinique"
    },
    {
      code: "+222",
      name: "Mauritania"
    },
    {
      code: "+230",
      name: "Mauritius"
    },
    {
      code: "+262",
      name: "Mayotte"
    },
    {
      code: "+52",
      name: "Mexico"
    },
    {
      code: "+691",
      name: "Micronesia"
    },
    {
      code: "+1 808",
      name: "Midway Island"
    },
    {
      code: "+373",
      name: "Moldova"
    },
    {
      code: "+377",
      name: "Monaco"
    },
    {
      code: "+976",
      name: "Mongolia"
    },
    {
      code: "+382",
      name: "Montenegro"
    },
    {
      code: "+1664",
      name: "Montserrat"
    },
    {
      code: "+212",
      name: "Morocco"
    },
    {
      code: "+95",
      name: "Myanmar"
    },
    {
      code: "+264",
      name: "Namibia"
    },
    {
      code: "+674",
      name: "Nauru"
    },
    {
      code: "+977",
      name: "Nepal"
    },
    {
      code: "+31",
      name: "Netherlands"
    },
    {
      code: "+599",
      name: "Netherlands Antilles"
    },
    {
      code: "+1 869",
      name: "Nevis"
    },
    {
      code: "+687",
      name: "New Caledonia"
    },
    {
      code: "+64",
      name: "New Zealand"
    },
    {
      code: "+505",
      name: "Nicaragua"
    },
    {
      code: "+227",
      name: "Niger"
    },
    {
      code: "+234",
      name: "Nigeria"
    },
    {
      code: "+683",
      name: "Niue"
    },
    {
      code: "+672",
      name: "Norfolk Island"
    },
    {
      code: "+850",
      name: "North Korea"
    },
    {
      code: "+1 670",
      name: "Northern Mariana Islands"
    },
    {
      code: "+47",
      name: "Norway"
    },
    {
      code: "+968",
      name: "Oman"
    },
    {
      code: "+92",
      name: "Pakistan"
    },
    {
      code: "+680",
      name: "Palau"
    },
    {
      code: "+970",
      name: "Palestinian Territory"
    },
    {
      code: "+507",
      name: "Panama"
    },
    {
      code: "+675",
      name: "Papua New Guinea"
    },
    {
      code: "+595",
      name: "Paraguay"
    },
    {
      code: "+51",
      name: "Peru"
    },
    {
      code: "+63",
      name: "Philippines"
    },
    {
      code: "+48",
      name: "Poland"
    },
    {
      code: "+351",
      name: "Portugal"
    },
    {
      code: "+1 787",
      name: "Puerto Rico"
    },
    {
      code: "+974",
      name: "Qatar"
    },
    {
      code: "+262",
      name: "Reunion"
    },
    {
      code: "+40",
      name: "Romania"
    },
    {
      code: "+7",
      name: "Russia"
    },
    {
      code: "+250",
      name: "Rwanda"
    },
    {
      code: "+685",
      name: "Samoa"
    },
    {
      code: "+378",
      name: "San Marino"
    },
    {
      code: "+966",
      name: "Saudi Arabia"
    },
    {
      code: "+221",
      name: "Senegal"
    },
    {
      code: "+381",
      name: "Serbia"
    },
    {
      code: "+248",
      name: "Seychelles"
    },
    {
      code: "+232",
      name: "Sierra Leone"
    },
    {
      code: "+65",
      name: "Singapore"
    },
    {
      code: "+421",
      name: "Slovakia"
    },
    {
      code: "+386",
      name: "Slovenia"
    },
    {
      code: "+677",
      name: "Solomon Islands"
    },
    {
      code: "+27",
      name: "South Africa"
    },
    {
      code: "+500",
      name: "South Georgia and the South Sandwich Islands"
    },
    {
      code: "+82",
      name: "South Korea"
    },
    {
      code: "+34",
      name: "Spain"
    },
    {
      code: "+94",
      name: "Sri Lanka"
    },
    {
      code: "+249",
      name: "Sudan"
    },
    {
      code: "+597",
      name: "Suriname"
    },
    {
      code: "+268",
      name: "Swaziland"
    },
    {
      code: "+46",
      name: "Sweden"
    },
    {
      code: "+41",
      name: "Switzerland"
    },
    {
      code: "+963",
      name: "Syria"
    },
    {
      code: "+886",
      name: "Taiwan"
    },
    {
      code: "+992",
      name: "Tajikistan"
    },
    {
      code: "+255",
      name: "Tanzania"
    },
    {
      code: "+66",
      name: "Thailand"
    },
    {
      code: "+670",
      name: "Timor Leste"
    },
    {
      code: "+228",
      name: "Togo"
    },
    {
      code: "+690",
      name: "Tokelau"
    },
    {
      code: "+676",
      name: "Tonga"
    },
    {
      code: "+1 868",
      name: "Trinidad and Tobago"
    },
    {
      code: "+216",
      name: "Tunisia"
    },
    {
      code: "+90",
      name: "Turkey"
    },
    {
      code: "+993",
      name: "Turkmenistan"
    },
    {
      code: "+1 649",
      name: "Turks and Caicos Islands"
    },
    {
      code: "+688",
      name: "Tuvalu"
    },
    {
      code: "+1 340",
      name: "U.S. Virgin Islands"
    },
    {
      code: "+256",
      name: "Uganda"
    },
    {
      code: "+380",
      name: "Ukraine"
    },
    {
      code: "+971",
      name: "United Arab Emirates"
    },
    {
      code: "+44",
      name: "United Kingdom"
    },
    {
      code: "+1",
      name: "United States"
    },
    {
      code: "+598",
      name: "Uruguay"
    },
    {
      code: "+998",
      name: "Uzbekistan"
    },
    {
      code: "+678",
      name: "Vanuatu"
    },
    {
      code: "+58",
      name: "Venezuela"
    },
    {
      code: "+84",
      name: "Vietnam"
    },
    {
      code: "+1 808",
      name: "Wake Island"
    },
    {
      code: "+681",
      name: "Wallis and Futuna"
    },
    {
      code: "+967",
      name: "Yemen"
    },
    {
      code: "+260",
      name: "Zambia"
    },
    {
      code: "+255",
      name: "Zanzibar"
    },
    {
      code: "+263",
      name: "Zimbabwe"
    }
  ]
  isModalOpen = false;
  checkCheckbox:boolean = false;
  isLogin:boolean = true;
  otpErrorMessage:any;
  isLoading:boolean = false;
  loading:boolean = false
  modalTitle:any;
  validationError:any;
  pageContent:any;
  validation_messages = {
    mobileNo: [
      {
        type: 'required',
        message: 'Mobile Number is Required',
      },
      {
        type: 'wrongNumber',
        message: 'Invalid Mobile Number.',
      },
    ],
    countryCode: [
      {
        type: 'required',
        message: 'Country Code is Required',
      },
    ]
  };
  constructor(
    private formBuilder:FormBuilder,
    private httpService:HttpService,
    private commonService:CommonService,
    private router:Router,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
    this.commonService.userLoggedOut.subscribe(()=>{
      for(var i=0; i < this.mobileCountryCode?.length; i++){
        if(this.mobileCountryCode[i].name === 'India'){
          this.validationForm.controls['countryCode'].setValue(this.mobileCountryCode[i].code)
        }
      }
    })
  }

  ngOnInit() {
    this.validationForm = this.formBuilder.group({
      countryCode:['', Validators.required],
      mobileNo:['',[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    })
    for(var i=0; i < this.mobileCountryCode?.length; i++){
      if(this.mobileCountryCode[i].name === 'India'){
        this.validationForm.controls['countryCode'].setValue(this.mobileCountryCode[i].code)
      }
    }
  }

  changeNumber(){
    this.validationForm.reset();
    for(var i=0; i < this.mobileCountryCode?.length; i++){
      if(this.mobileCountryCode[i].name === 'India'){
        this.validationForm.controls['countryCode'].setValue(this.mobileCountryCode[i].code)
      }
    }
    this.checkCheckbox = false
    this.isLogin = true
  }

  checkValidation(){
    return (!this.validationForm.valid || this.checkCheckbox == false)
  }
  


  async googleSignin() {
    const user = await GoogleAuth.signIn();
    if (user){
      this.socialLogin(user, 'GOOGLE');
    }
  }

  socialLogin(userData:any, provider:any){
    var formData = new FormData()
    formData.append("email", userData?.email)
    formData.append("provider_id", userData?.id)
    formData.append("provider",  provider)
    formData.append("first_name", userData?.givenName)
    formData.append("last_name", userData?.familyName)
    this.httpService.post(apiRoutes.social_login, formData).subscribe({
      next: (v: any) => {
        console.log(v)
        if(v.status == 201){
          this.isLoading = !this.isLoading;
          this.commonService.setUserToken(v['token']);
          this.httpService.setHeader();
          this.commonService.presentSuccessToast(v.message)
          this.commonService.userLoggedIn.emit();
          this.httpService.updateUserDetails()
          this.validationForm.reset();
          if(v?.flag==1){
            this.navigateToProfilePage()
          }else{
            this.navigateToHomePage();
          }
        }else{
          this.commonService.presentFailureToast(v.error.message)
        }
      },
      error: (e) => {
        console.log(e.error)
        this.commonService.presentFailureToast(e.error.error)
        this.isLoading = !this.isLoading;
      },
    })

  }

  async facebookLogin(){
    const loginData = FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
    if (loginData){
      this.socialLogin(loginData,'FACEBOOK');
    }
  }

  setOpen(isOpen: boolean, type:any) {
    this.isModalOpen = isOpen;
    if(type == 'terms'){
      this.modalTitle = 'Terms of Use'
      this.getContent(this.modalTitle)
    }else {
      this.modalTitle = 'Privacy Policy'
      this.getContent(this.modalTitle)
    }
    
  }

  getOtp(){
    this.isLoading = !this.isLoading;
    const formValue = this.validationForm.value;
    this.validationError = ''
    var formData = new FormData();
    formData.append('number', formValue.mobileNo);
    formData.append('phone_code', formValue.countryCode);
    this.httpService.post(apiRoutes.get_otp, formData).subscribe({
      next: (v: any) => {
        console.log(v);
        if(v.status == 200){
          this.isLogin = false
          this.commonService.presentSuccessToast(v.message)
        }else if(v.status == 400){
          this.validationError = v.error.errors;
          console.log("validation error", this.validationError)
        }else{
          this.commonService.presentFailureToast(v.message)
        }
      },
      error: (e) => {
        console.log(e)
        this.isLoading = !this.isLoading;
      },
    })
  }

  onOtpChange(event:any){
    if(event?.length == 4){
      this.verifyOtp(event)
    }
  }


  verifyOtp(otp:any) {
    this.otpErrorMessage = null;
    this.isLoading = !this.isLoading;
    const formValue = this.validationForm.value
    var formData = new FormData();
    formData.append('number', formValue?.mobileNo);
    formData.append('phone_code', formValue.countryCode);
    formData.append('otp', otp);
    this.httpService.post(apiRoutes.verfiy_otp, formData).subscribe({
      next: (v: any) => {
        console.log(v)
        if(v.status == 201){
          this.isLoading = !this.isLoading;
          this.commonService.setUserToken(v['token']);
          this.httpService.setHeader();
          this.commonService.presentSuccessToast(v.message)
          this.commonService.userLoggedIn.emit();
          this.httpService.updateUserDetails()
          this.validationForm.reset();
          if(v?.flag==1){
            this.navigateToProfilePage()
          }else{
            this.navigateToHomePage();
          }
          this.isLogin = true
        }else{
          this.commonService.presentFailureToast(v.error.error)
        }
      },
      error: (e) => {
        console.log("error", e.error)
        this.commonService.presentFailureToast(e.error.errors)
        this.isLoading = !this.isLoading;
      },
    })
  }

  navigateToHomePage(){
    this.router.navigate(['home'])
  }

  getContent(title:any){
    this.loading = true
    let apiUrl = apiRoutes.about_us + '?page_name=' + title
    this.httpService.get(apiUrl).subscribe({
      next:(v:any) =>{
        this.loading = false;
        this.pageContent = v.response
      },
      error:(e:any)=>{
        this.loading = false;
      }
    })
  }

  navigateToProfilePage(){
    this.router.navigate(['my-profile', 'update'])
  }
}
