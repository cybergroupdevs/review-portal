import { ServicesService } from './../services.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private _service: ServicesService, private _router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data.designation;

    if (user === next.data.role) {
      return true;
    }
    // else if(user)

    // navigate to not found page
    this._router.navigate(['/404']);
    return false;
  }
}
