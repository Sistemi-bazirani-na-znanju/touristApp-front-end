import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Registration } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailExists: boolean=false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator });

  get confirmPassword(): FormControl {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }


  get email(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  
  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }
  
  get firstName(): FormControl {
    return this.registrationForm.get('firstName') as FormControl;
  }
  
  get lastName(): FormControl {
    return this.registrationForm.get('lastName') as FormControl;
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
  
  register(): void {
    const registration: Registration = {
      firstName: this.registrationForm.value.firstName || "",
      lastName: this.registrationForm.value.lastName || "",
      email: this.registrationForm.value.email || "",
      password: this.registrationForm.value.password || ""
    };
    
    console.log("Registration Data:", registration);
    console.log("Poslat zahtev auth servisu");

    if (this.registrationForm.valid) {
      console.log("Uspesno popunjena forma");
      this.authService.register(registration).subscribe({
        next: () => {
          this.router.navigate(['registrationConfirmation']);
        },
        error: (error) => {
          if (error.status === 400) {
            // Handle email already exists error
            console.log("error je 400")
            this.registrationForm.get('email')?.setErrors({ 'emailExists': true });
          } else {
            // Handle other errors
            console.error('Error during registration:', error);
          }
        },
      });
    }
  }
}
