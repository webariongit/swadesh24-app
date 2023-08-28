import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../common-service/common.service';
import { apiRoutes } from 'src/app/constant/config';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  @Output() userDetail: EventEmitter<any> = new EventEmitter();
  header: any;

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private router:Router
  ) { }

  setHeader() {
    this.header = new HttpHeaders().set(
      'Authorization',
      'Bearer' + ' ' + this.commonService.getUserToken()
    );
  }

  get(url: any){
    let apiRoute = environment.apiUrl + url;
    return new Observable((observer) => {
      this.http.get(apiRoute, { headers: this.header }).subscribe(
        (data) => {
          observer.next(data);
          observer.complete();
        },
        (err) => {
          observer.next(err);
          observer.complete();
        }
      );
    });
  }
  
   post(url:any, data:any) {
    let apiRoute = environment.apiUrl + url;
    return new Observable((observer) => {
      this.http.post(apiRoute, data, { headers: this.header }).subscribe(
        (data) => {
          observer.next(data);
          observer.complete();
        },
        (err) => {
          observer.next(err);
          observer.complete();
        }
      );
    });
  }
  
  put(url:any, data:any) {
    let apiRoute = environment.apiUrl + url;
    return new Observable((observer) => {
      this.http.put(apiRoute, data).subscribe(
        (data) => {
          observer.next(data);
          observer.complete();
        },
        (err) => {
          observer.error(err);
          observer.complete();
        }
      );
    });
  }
  
  delete(url:any) {
    let apiRoute = environment.apiUrl + url;
    return new Observable((observer) => {
      this.http.delete(apiRoute, { headers: this.header }).subscribe(
        (data) => {
          observer.next(data);
          observer.complete();
        },
        (err) => {
          observer.error(err);
          observer.complete();
        }
      );
    });
   }

  logOut(){
    console.log("triggered")
    this.get(apiRoutes.userlogout)
      .subscribe((response:any) => {
        console.log(response);
        this.commonService.clearLocalStorage();
        this.commonService.setUserDetail(null);
        this.commonService.userLoggedOut.emit()
        this.userDetail.emit(null);
        this.router.navigate(['login'])
      });
  }

  public updateUserDetails() {
    this.get(apiRoutes.profile_details)
      .subscribe((response: any) => {
        if(response && response.status !== 500) {
          this.commonService.setUserDetail(response);
          this.userDetail.emit(response);
        } 
      })
  }

}
