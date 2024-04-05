import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Login } from '../../infrastructure/auth/model/login.model';

@Component({
  selector: 'pd-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailExists: boolean=false;
  errors: any;
  isValid=true;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  notification="";
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

 

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  login(): void {
    this.setErrors();
    const login: Login = {
      username: this.loginForm.value.email || "",
      password: this.loginForm.value.password || "",
    };

    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
          next: (res) => {
              // console.log('TOKENNNN' + res.accessToken);
              // const token = res.accessToken;
              // localStorage.setItem('jwt', token);
              // this.authService.setUser();
              // this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error occurred during login:', error);
          this.notification= "Password or email are incorrect";
          this.isValid = false;
        }
      });
    }
  }
  setErrors():void
  {
    if (this.loginForm.value.password === "" || this.loginForm.value.email === "") {
      this.notification= "Password or email are incorrect";
      this.isValid = false;
    }
  }
}
