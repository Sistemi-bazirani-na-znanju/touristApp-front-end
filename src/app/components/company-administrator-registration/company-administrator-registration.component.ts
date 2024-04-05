import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyService } from '../../company/company.service';
import { CompanyAdministrator } from '../../infrastructure/auth/model/company-administrator.model';

@Component({
  selector: 'pd-register-company-administrator',
  templateUrl: './company-administrator-registration.component.html',
  styleUrls: ['./company-administrator-registration.component.css'],
})
export class RegisterCompanyAdministratorComponent {
  companyId: number | null = null;

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.companyId = id ? parseInt(id, 10) : null;
      if (this.companyId !== null) {
      }
    });
  }

  registrationCompanyAdministratorForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      countryAdministrator: new FormControl('', [Validators.required]),
      cityAdministrator: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+\d{12}$/),
      ]),
      workplace: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  registerCompanyAdministrator(): void {
    const companyAdministrator: CompanyAdministrator = {
      id: -1,
      firstName:
        this.registrationCompanyAdministratorForm.value.firstName || '',
      lastName: this.registrationCompanyAdministratorForm.value.lastName || '',
      email: this.registrationCompanyAdministratorForm.value.email || '',
      password: this.registrationCompanyAdministratorForm.value.password || '',
      city:
        this.registrationCompanyAdministratorForm.value.cityAdministrator || '',
      country:
        this.registrationCompanyAdministratorForm.value.countryAdministrator ||
        '',
      phoneNumber:
        this.registrationCompanyAdministratorForm.value.phoneNumber || '',
      lastPasswordResetDate: new Date(),
      active: true,
      workplace:
        this.registrationCompanyAdministratorForm.value.workplace || '',
      companyName:
        this.registrationCompanyAdministratorForm.value.companyName || '',
    };

    if (this.registrationCompanyAdministratorForm.valid) {
      console.log('Uspesno popunjena forma');
      this.companyService
        .registerCompanyAdministrator(this.companyId, companyAdministrator)
        .subscribe({
          next: () => {},
          error: (error) => {
            if (error.status === 400) {
              // Handle email already exists error
              console.log('error je 400');
              this.registrationCompanyAdministratorForm
                .get('email')
                ?.setErrors({ emailExists: true });
            } else {
              // Handle other errors
              console.error('Error during registration:', error);
            }
          },
        });
    }
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
