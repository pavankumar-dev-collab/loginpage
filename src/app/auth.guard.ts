import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
      if (localStorage.getItem('userfound')) {
          return true;
      }
      alert("Restricted Access Please Login!!!")
      this.router.navigate(['/login']);
      return false;
  }
  
}
