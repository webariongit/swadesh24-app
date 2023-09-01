import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(
    private router: Router, 
    private commonService: CommonService
  ) { }

  canActivate(route:any, state: RouterStateSnapshot) {
    if (this.commonService.getUserToken()) {
      return true;
    } else {
      this.commonService.presentFailureToast('Please login first ');
      this.router.navigate(['login']);
      return false;
    }
  }
}
