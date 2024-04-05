import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from '../auth.service';
import { TokenStorage } from '../jwt/token.service';

import { SystemAdminService } from '../../rest/system-admin.service';
import { SystemAdmin } from '../../rest/model/system-admin.model';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthGuardService, private aService: AuthService, private router: Router, private tokenStorage: TokenStorage, private systemAdminService: SystemAdminService) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedRole = route.data['expectedRole'];
    const role = this.aService.user$.value.roles;

    if (!this.aService.user$ || !role.includes(expectedRole)) {
      this.router.navigate(['/']);
      return false;
    }


    if (role.includes('ROLE_SYSTEMADMIN')) {
      const firstLogged = await this.isSystemAdminFirstLogged(this.aService.user$.value.email).toPromise();
      if (firstLogged) {
        this.router.navigate(['/change-password']);
        return false;
      }
    }


    return true;
  }

  isSystemAdminFirstLogged(name: String) {
    return this.systemAdminService.getByName(name).pipe(
      map((systemAdmin: SystemAdmin) => {
        if (systemAdmin && systemAdmin.firstLogged !== undefined) {
          return systemAdmin.firstLogged;
        }
        return false;
      }),
      catchError((error) => {
        console.error("Error occurred:", error);
        return of(true); // or any default value in case of an error
      })
    );
  }
}
