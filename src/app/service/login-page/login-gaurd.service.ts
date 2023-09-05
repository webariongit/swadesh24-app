import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGaurdService {

  constructor(
    private router: Router, 
    private commonService: CommonService
  ) { }
  canActivate(route:any, state: RouterStateSnapshot) {
    if (!this.commonService.getUserToken()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
