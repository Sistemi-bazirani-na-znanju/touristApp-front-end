import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../infrastructure/auth';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { User } from '../../infrastructure/auth/model/user.model';
import { CompanyAdmin } from '../../infrastructure/rest/model/company-admin.model';
import { MatDialog } from '@angular/material/dialog';
import { ChangeCopmanyAdminPasswordComponent } from '../change-company-admin-password/change-company-admin-password.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'pd-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userId: number = -1;
  user?: User;
  companyAdmin?: CompanyAdmin;

  constructor(private authService: AuthService,
              private companyAdminService: CompanyAdminService,
              private dialogRef: MatDialog) { }

  isAuthenticated$ = this.authService.isAuthenticated$;

  ngOnInit(): void {
    // this.isAuthenticated$.subscribe((isAuthenticated) => {
    //   window.location.reload();
    // });
    

    this.fetchUser();
  }

  fetchUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;

      if (user.roles.includes('ROLE_COMPANYADMIN')) {
        this.companyAdminService.getById(this.userId).subscribe(registeredUser => {
          this.companyAdmin = registeredUser;
          if (this.companyAdmin.firstLogin) {
            this.changePassword();
          }
        })
      }
    });
  }  

  changePassword() {
    let user = {
      email: this.companyAdmin!.email,
      password: this.companyAdmin!.password
    }
    this.dialogRef.open(ChangeCopmanyAdminPasswordComponent, {
      width: '400px', // Set the width as per your requirement
      disableClose: true, // Prevent closing the dialog by clicking outside or pressing Esc
      autoFocus: true, // Autofocus on the first focusable element in the dialog
      data: { companyAdmin: this.companyAdmin, user: user }  
    });
  }

}
