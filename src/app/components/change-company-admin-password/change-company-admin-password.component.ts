import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../infrastructure/auth';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { CompanyAdmin } from '../../infrastructure/rest/model/company-admin.model';
import { ChangePassword } from '../../infrastructure/auth/model/change-password.model';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-change-password',
  templateUrl: './change-company-admin-password.component.html',
  styleUrl: './change-company-admin-password.component.css',
})
export class ChangeCopmanyAdminPasswordComponent implements OnInit {
  password: string = '';
  newPassword: string = '';
  errors: any;
  companyAdmin!: CompanyAdmin;
  user!: any;

  constructor(
    public dialog: MatDialogRef<ChangeCopmanyAdminPasswordComponent>,
    private authService: AuthService,
    private router: Router,
    private companyAdminService: CompanyAdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.companyAdmin = data.companyAdmin;
    this.user = data.user;
    this.errors = {
      password: '',
      newPassword: '',
    };
  }

  ngOnInit(): void {
    // console.log(this.companyAdmin.password);
  }

  changePassword(): void {
    if (this.validate()) {
      let cp: ChangePassword = {
        username: this.user.email,
        password: this.password,
        newPassword: this.newPassword,
      };
      this.authService.changePassword(cp, false).subscribe({
        next: (result: any) => {
          console.log('Password changed successfully!');
          location.reload();
        },
        error: (result: any) => {
          this.errors.password = 'Old password not correct.';
        },
      });
    }
  }

  validate(): boolean {
    this.resetErrors();

    let isValid = true;

    if (this.password == '') {
      this.errors.password = 'Password must not be empty.';
      isValid = false;
    }

    if (this.newPassword == '') {
      this.errors.newPassword = 'New password must not be empty.';
      isValid = false;
    }

    return isValid;
  }

  resetErrors(): void {
    this.errors.password = '';
    this.errors.newPassword = '';
  }
}
