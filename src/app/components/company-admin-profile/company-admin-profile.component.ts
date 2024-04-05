import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CompanyAdmin } from '../../infrastructure/rest/model/company-admin.model';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { AuthService } from '../../infrastructure/auth';
import { MatDialog } from '@angular/material/dialog';
import { ChangeCopmanyAdminPasswordComponent } from '../change-company-admin-password/change-company-admin-password.component';

@Component({
  selector: 'pd-company-admin-profile',
  templateUrl: './company-admin-profile.component.html',
  styleUrl: './company-admin-profile.component.css',
})
export class CompanyAdminProfileComponent {
  faUser = faUser;
  companyAdminId: number = -1;
  companyAdmin: CompanyAdmin = new CompanyAdmin();
  companyAdminCopy: any;
  errors: any;
  canEdit: boolean = false;
  user: any;
  userId: number = -1;

  constructor(
    private companyAdminService: CompanyAdminService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialogRef: MatDialog
  ) {
    this.companyAdminCopy = {
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      city: '',
      country: '',
      phoneNumber: '',
      workplace: '',
      companyName: '',
      email: '',
    };

    this.errors = {
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      city: '',
      country: '',
      phoneNumber: '',
      workplace: '',
      companyName: '',
    };
  }

  ngOnInit(): void {
    this.setInputReadOnly(true);
    this.fetchUser();
  }

  fetchUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;
      this.companyAdminService
        .getById(this.userId)
        .subscribe((registeredUser) => {
          this.companyAdmin = registeredUser;
          this.companyAdminId = this.userId;
          this.makeUserCopy();
        });
    });
  }

  saveChanges(): void {
    if (this.validate()) {
      this.companyAdminService
        .update(this.companyAdminId, this.companyAdminCopy)
        .subscribe({
          next: (result: CompanyAdmin) => {
            this.companyAdmin = result;
            this.makeUserCopy();
          },
          error: (errData) => {
            console.log(errData);
          },
        });
      this.endEditing();
    }
  }

  makeUserCopy(): void {
    const { ...userCopy } = this.companyAdmin;
    this.companyAdminCopy = userCopy;
    this.companyAdminCopy.passwordConfirmation = this.companyAdminCopy.password;
  }

  startEditing(): void {
    this.canEdit = true;
    this.setInputReadOnly(false);
  }

  endEditing(): void {
    this.canEdit = false;
    this.resetErrors();
    this.setInputReadOnly(true);
    this.makeUserCopy();
  }

  setInputReadOnly(readOnly: boolean): void {
    var inputs = document.querySelectorAll('.profile-input');
    inputs.forEach(function (input) {
      const inputElement = input as HTMLInputElement;
      inputElement.readOnly = readOnly;
    });
  }

  validate(): boolean {
    let isValid = true;
    this.resetErrors();

    if (this.companyAdminCopy.password === '') {
      this.errors.password = 'Password is required.';
      isValid = false;
    }
    if (this.companyAdminCopy.passwordConfirmation === '') {
      this.errors.passwordConfirmation = 'Password confirmation is required.';
      isValid = false;
    }
    if (
      this.companyAdminCopy.password !== '' &&
      this.companyAdminCopy.passwordConfirmation !== '' &&
      this.companyAdminCopy.password !==
        this.companyAdminCopy.passwordConfirmation
    ) {
      this.errors.password =
        'Password cand password confirmation must be the same.';
      this.errors.passwordConfirmation =
        'Password cand password confirmation must be the same.';
      isValid = false;
    }

    if (this.companyAdminCopy.firstName === '') {
      this.errors.firstName = 'Name is required.';
      isValid = false;
    }

    if (this.companyAdminCopy.lastName === '') {
      this.errors.lastName = 'Surname is required.';
      isValid = false;
    }

    if (this.companyAdminCopy.country === '') {
      this.errors.country = 'Country is required.';
      isValid = false;
    }

    if (this.companyAdminCopy.city === '') {
      this.errors.city = 'City is required.';
      isValid = false;
    }

    if (this.companyAdminCopy.phoneNumber === '') {
      this.errors.phoneNumber = 'Phone number is required.';
      isValid = false;
    }

    const phoneNumberRegEx = /^\+\d{12}$/;
    if (
      this.companyAdminCopy.phoneNumber !== '' &&
      !phoneNumberRegEx.test(this.companyAdminCopy.phoneNumber)
    ) {
      this.errors.phoneNumber =
        'Phone number must be in format: format +XXXXXXXXXXXX.';
      isValid = false;
    }

    if (this.companyAdminCopy.workplace === '') {
      this.errors.workplace = 'Workplace is required.';
      isValid = false;
    }

    if (this.companyAdminCopy.companyName === '') {
      this.errors.companyName = 'Company name is required.';
      isValid = false;
    }

    return isValid;
  }

  resetErrors(): void {
    this.errors.password = '';
    this.errors.passwordConfirmation = '';
    this.errors.firstName = '';
    this.errors.lastName = '';
    this.errors.country = '';
    this.errors.city = '';
    this.errors.phoneNumber = '';
    this.errors.workplace = '';
    this.errors.companyName = '';
  }

  changePassword() {
    let user = {
      email: this.companyAdmin.email,
      password: this.companyAdmin.password
    }
    this.dialogRef.open(ChangeCopmanyAdminPasswordComponent, {
      width: '400px', // Set the width as per your requirement
      disableClose: true, // Prevent closing the dialog by clicking outside or pressing Esc
      autoFocus: true, // Autofocus on the first focusable element in the dialog
      data: { companyAdmin: this.companyAdmin, user: user },
    });
  }
}
