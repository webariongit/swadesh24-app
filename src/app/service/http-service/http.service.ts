import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../common-service/common.service';
import { apiRoutes } from 'src/app/constant/config';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  header: any;
  constructor(
    private http: HttpClient,
    private commonService: CommonService
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
      console.log("Header", this.header)
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
    // this.post(apiRoutes.LOGOUT, {})
    //   .subscribe((response:any) => {
    //     console.log(response);
    //     this.commonService.clearLocalStorage();
    //     this.commonService.setUserDetail(null);
    //     this.commonService.setUserWishlistDetail(null);
    //     this.commonService.setUserCartDetails(null);
    //     this.userDetail.emit(null);
    //     this.cart.emit(null)
    //     this.commonService.userLoggedOut.emit();
       
    //   });
  }

  promisePost(route:any, form_data:any) {
    return new Promise((resolve, reject) => {
      console.log("check route", route)
      this.post(route, form_data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  promiseGet(route:any) {
    return new Promise((resolve, reject) => {
      this.get(route).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  promiseDelete(route:any) {
    return new Promise((resolve, reject) => {
      this.delete(route).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


}
