import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SystemAdmin } from '../../infrastructure/rest/model/system-admin.model';
import { SystemAdminService } from '../../infrastructure/rest/system-admin.service';

@Component({
  selector: 'pd-register-system-administrator',
  templateUrl: './system-administrator-registration.component.html',
  styleUrls: ['./system-administrator-registration.component.css'] 
})
export class RegisterSystemAdministratorComponent {


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private systemAdminService: SystemAdminService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

    });
  }

  registrationSystemAdministratorForm = new FormGroup({

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    countryAdministrator: new FormControl('', [Validators.required]),
    cityAdministrator: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\+\d{12}$/)]),
  }, { validators: this.passwordMatchValidator });



  registerSystemAdministrator(): void {

    const systemAdministrator: SystemAdmin = {
          
        firstName: this.registrationSystemAdministratorForm.value.firstName || "",
        lastName: this.registrationSystemAdministratorForm.value.lastName || "",
        email: this.registrationSystemAdministratorForm.value.email || "",
        password: this.registrationSystemAdministratorForm.value.password || "",
        city: this.registrationSystemAdministratorForm.value.cityAdministrator || "", 
        country: this.registrationSystemAdministratorForm.value.countryAdministrator || "",
        phoneNumber: this.registrationSystemAdministratorForm.value.phoneNumber || "",
        lastPasswordResetDate: new Date(),
        active: true,
        firstLogged: true

    }


    if (this.registrationSystemAdministratorForm.valid) {
      console.log("Uspesno popunjena forma");
      this.systemAdminService.registerSystemAdministrator(systemAdministrator).subscribe({
        next: (response: any) => {
          // Handle the success response
          console.log('System Administrator registered successfully:', response);
        },
        error: (error: any) => {
          if (error.status === 400) {
            // Handle email already exists error
            console.log("error je 400");
            this.registrationSystemAdministratorForm.get('email')?.setErrors({ 'emailExists': true });
          } else {
            // Handle other errors
            console.error('Error during registration:', error);
          }
        }
      });

    }
    else{
        console.log("invalid");
      }
    }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }


}
