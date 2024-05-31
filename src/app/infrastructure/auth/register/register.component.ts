import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Registration } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ExcursionType } from '../../rest/model/excursion.model';

@Component({
  selector: 'pd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailExists: boolean = false;
  selectedDestinations: string[] = [];
  selectedExcursionTypes: ExcursionType[] = []; // Change the type to ExcursionType[] to work with enums

  destinationOptions: string[] = [
    'Paris', 'London', 'New York', 'Tokyo', 'Sydney',
    'Rome', 'Barcelona', 'Los Angeles', 'Hong Kong', 'Singapore',
    'Dubai', 'Cape Town'
  ];
  
  excursionTypeOptions: string[] = [
    'HISTORICAL', 'CULTURAL', 'GASTRONOMIC',
    'SPORTS', 'RELAXATION', 'DIVING',
    'HIKING'
  ];

  destinationError: boolean = false;
  excursionTypeError: boolean = false;

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

  handleDestinationChange(event: Event, destination: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedDestinations.push(destination);
    } else {
      const index = this.selectedDestinations.indexOf(destination);
      if (index !== -1) {
        this.selectedDestinations.splice(index, 1);
      }
    }
    this.validateDestinations();
  }

  handleExcursionTypeChange(event: Event, excursionType: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      // Convert the string to ExcursionType enum
      const excursionTypeEnum = ExcursionType[excursionType as keyof typeof ExcursionType];
      if (excursionTypeEnum) {
        this.selectedExcursionTypes.push(excursionTypeEnum);
      }
    } else {
      // Convert the string to ExcursionType enum
      const excursionTypeEnum = ExcursionType[excursionType as keyof typeof ExcursionType];
      if (excursionTypeEnum) {
        const index = this.selectedExcursionTypes.indexOf(excursionTypeEnum);
        if (index !== -1) {
          this.selectedExcursionTypes.splice(index, 1);
        }
      }
    }
    this.validateExcursionTypes();
  }

  validateDestinations(): void {
    this.destinationError = this.selectedDestinations.length < 7 || this.selectedDestinations.length > 10;
  }

  validateExcursionTypes(): void {
    this.excursionTypeError = this.selectedExcursionTypes.length != 3;
  }

  register(): void {
    if (this.registrationForm.valid) {
      const registration: Registration = {
        firstName: this.registrationForm.value.firstName || "",
        lastName: this.registrationForm.value.lastName || "",
        email: this.registrationForm.value.email || "",
        password: this.registrationForm.value.password || "",
        destinations: (this.destinationError || this.excursionTypeError) ? [] : this.selectedDestinations,
        excursionTypes: (this.destinationError || this.excursionTypeError) ? [] : this.selectedExcursionTypes, // Pass selectedExcursionTypes as ExcursionType[]
      };
      this.authService.registerAutoApp(registration).subscribe({
        next: () => {
          this.authService.register(registration).subscribe({
            next: () => {
              this.router.navigate(['welcome']);
            },
            error: (error) => {
              if (error.status === 400) {
                this.registrationForm.get('email')?.setErrors({ 'emailExists': true });
              } else {
                console.error('Error during registration:', error);
              }
            },
          });
        },
        error: (error) => {
          if (error.status === 400) {
            this.registrationForm.get('email')?.setErrors({ 'emailExists': true });
          } else {
            console.error('Error during registration:', error);
          }
        },
      });
      
    }
  }
}
