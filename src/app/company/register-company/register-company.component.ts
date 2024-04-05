import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Company } from '../model/company.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'pd-register',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css'],
})
export class RegisterCompanyComponent {
  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  registrationCompanyForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      openingTime: new FormControl('', [Validators.required]),
      closingTime: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      averageRating: new FormControl(0, [Validators.required]),

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

  registerCompany(): void {
    const company: Company = {
      name: this.registrationCompanyForm.value.name || '',
      address: this.registrationCompanyForm.value.address || '',
      city: this.registrationCompanyForm.value.city || '',
      country: this.registrationCompanyForm.value.country || '',
      openingTime: this.registrationCompanyForm.value.openingTime || '',
      closingTime: this.registrationCompanyForm.value.closingTime || '',
      description: this.registrationCompanyForm.value.description || '',
      averageRating: 2.5,
      imageUrl:
        'https://pactandpartners.com/wp-content/uploads/2020/02/Medical-Devices-scaled.jpeg',

      companyAdministrators: [
        {
          id: -1,
          firstName: this.registrationCompanyForm.value.firstName || '',
          lastName: this.registrationCompanyForm.value.lastName || '',
          email: this.registrationCompanyForm.value.email || '',
          password: this.registrationCompanyForm.value.password || '',
          city: this.registrationCompanyForm.value.cityAdministrator || '',
          country:
            this.registrationCompanyForm.value.countryAdministrator || '',
          phoneNumber: this.registrationCompanyForm.value.phoneNumber || '',
          lastPasswordResetDate: new Date(),
          active: true,
          workplace: this.registrationCompanyForm.value.workplace || '',
          companyName: this.registrationCompanyForm.value.companyName || '',
        },
      ],
    };

    if (this.registrationCompanyForm.valid) {
      console.log('Uspesno popunjena forma');
      this.companyService.registerCompany(company).subscribe({
        next: () => {},
        error: (error) => {
          if (error.status === 400) {
            // Handle email already exists error
            console.log('error je 400');
            this.registrationCompanyForm
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
