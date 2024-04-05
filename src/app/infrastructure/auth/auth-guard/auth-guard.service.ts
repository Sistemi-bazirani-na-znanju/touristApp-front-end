import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public cookieService: CookieService) { }

  isLoggedIn(): boolean{
    const isLoggedIn = this.cookieService.get('LoggedIn');
    return isLoggedIn==='true';
  }
}
