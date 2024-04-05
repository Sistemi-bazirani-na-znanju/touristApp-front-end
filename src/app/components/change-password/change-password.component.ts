import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ChangePassword } from '../../infrastructure/auth/model/change-password.model';

@Component({
  selector: 'pd-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  emailExists: boolean=false;
  errors: any;
  userEmail: string='';
  userPassword: string='';
  isValid=true;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.userEmail = user.email;
      this.userPassword = user.password;
    });
  }

  notification="";
  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

 



  get password(): FormControl {
    return this.changePasswordForm.get('password') as FormControl;
  }

  get newPassword(): FormControl{
    return this.changePasswordForm.get('newPassword') as FormControl
  }

  changePassword(): void {
    this.setErrors();
    const changePassword: ChangePassword = {
      username: this.userEmail,
      password: this.changePasswordForm.value.password || "",
      newPassword: this.changePasswordForm.value.newPassword || ""
    };

    if (this.changePasswordForm.valid) {
      this.authService.changePassword(changePassword).subscribe({
          next: () => {
              this.isValid = true;
              // this.router.navigate(['/']);          
        }
      });
    }
  }
  setErrors():void
  {
    if (this.changePasswordForm.value.password === "" || this.changePasswordForm.value.newPassword === "") {
      this.notification = "Passwords or email are incorrect";
      this.isValid = false;
    }

    if (this.changePasswordForm.value.password !== this.userPassword || this.changePasswordForm.value.password === this.changePasswordForm.value.newPassword){
      this.notification = "Incorrect input of passwords"
      this.isValid = false;
    }

    // if (this.changePasswordForm.value.password === this.changePasswordForm.value.newPassword) {
    //     this.notification= "Passwords are same";
    //     this.isValid = false;
    //   }
  }
}
