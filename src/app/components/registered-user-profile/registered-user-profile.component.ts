  import { Component, OnInit } from '@angular/core';
import { 
  faUser
 } from "@fortawesome/free-solid-svg-icons";
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../infrastructure/auth';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'pd-registered-user-profile',
  templateUrl: './registered-user-profile.component.html',
  styleUrl: './registered-user-profile.component.css'
})
export class RegisteredUserProfileComponent {
  faUser = faUser;
  userId: number = -1;
  user: RegisteredUser = new RegisteredUser();
  userCopy: any;
  errors: any;
  canEdit: boolean = false;

  constructor(private authService: AuthService,
              private userService: RegisteredUserService,
              private dialogRef: MatDialog,
              private route: ActivatedRoute){
    this.userCopy = {
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
    };

    this.errors = {
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
    };
  }

  ngOnInit(): void {
    this.setInputReadOnly(true);
    this.route.params.subscribe((params) => {
      this.fetchUser();
    })
  }

  fetchUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;
      this.userService.getById(this.userId).subscribe(registeredUser => {
        this.user = registeredUser;
        this.makeUserCopy();
      })
    });
  }

  saveChanges(): void {
    if(this.validate()) {
      this.userService.update(this.userId, this.userCopy).subscribe({
        next: (result: RegisteredUser) => {
          this.user = result;
          this.makeUserCopy();
        },
        error: () => {
          console.log("Error updating user");
        }
      })
      this.endEditing();
    }
    
  }

  makeUserCopy(): void {
    const { email, ...userCopy } = this.user;
    this.userCopy = userCopy;
    this.userCopy.passwordConfirmation =this.userCopy.password;
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
    inputs.forEach(function(input) {
      const inputElement = input as HTMLInputElement;
      inputElement.readOnly = readOnly;
    });
  }

  validate(): boolean {
    let isValid = true;
    this.resetErrors()

    if (this.userCopy.password === "") {
      this.errors.password = "Password is required.";
      isValid = false;
    }
    if (this.userCopy.passwordConfirmation === "") {
      this.errors.passwordConfirmation = "Password confirmation is required.";
      isValid = false;
    }
    if(this.userCopy.password !== "" && this.userCopy.passwordConfirmation !== "" && this.userCopy.password !== this.userCopy.passwordConfirmation) {
      this.errors.password = "Password cand password confirmation must be the same.";
      this.errors.passwordConfirmation = "Password cand password confirmation must be the same.";
      isValid = false;
    }
    
    if (this.userCopy.firstName === "") {
      this.errors.firstName = "Name is required.";
      isValid = false;
    }
    
    if (this.userCopy.lastName === "") {
      this.errors.lastName = "Surname is required.";
      isValid = false;
    }
    
    if (this.userCopy.country === "") {
      this.errors.country = "Country is required.";
      isValid = false;
    }
    
    if (this.userCopy.city === "") {
      this.errors.city = "City is required.";
      isValid = false;
    }
    
    if (this.userCopy.phoneNumber === "") {
      this.errors.phoneNumber = "Phone number is required.";
      isValid = false;
    }

    const phoneNumberRegEx = /^\+\d{12}$/;
    if (this.userCopy.phoneNumber !== "" && !phoneNumberRegEx.test(this.userCopy.phoneNumber)) {
      this.errors.phoneNumber = "Phone number must be in format: format +XXXXXXXXXXXX.";
      isValid = false;
    }
    
    if (this.userCopy.workplace === "") {
      this.errors.workplace = "Workplace is required.";
      isValid = false;
    }
    
    if (this.userCopy.companyName === "") {
      this.errors.companyName = "Company name is required.";
      isValid = false;
    }

    return isValid
  }

  resetErrors(): void {
    this.errors.password = "";
    this.errors.passwordConfirmation = "";
    this.errors.firstName = "";
    this.errors.lastName = "";
    this.errors.country = "";
    this.errors.city = "";
    this.errors.phoneNumber = "";
    this.errors.workplace = "";
    this.errors.companyName = "";
  };


}
