import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MainserviceService } from './service/mainservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private routes: Router, private mainservice: MainserviceService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('userid') != null) {
      let body = {
        id: localStorage.getItem('userid')
      }
      this.mainservice.check(body).subscribe(
        (res:any) => {
          // console.log(res);
          if (res.data.loginstatus == 1) {
            return true
          }else{
            this.routes.navigate(['/login']);
            return false
          }
        }
      )

      return true;
    }
    else {
      this.routes.navigate(['/login']);
      return false;
    }
  }
}