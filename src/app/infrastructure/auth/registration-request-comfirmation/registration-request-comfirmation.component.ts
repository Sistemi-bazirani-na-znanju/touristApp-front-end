import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-registration-request-comfirmation',
  templateUrl: './registration-request-comfirmation.component.html',
  styleUrl: './registration-request-comfirmation.component.css'
})
export class RegistrationRequestComfirmationComponent {

  constructor(
    private router: Router
  ){}

  returnToHomePage() {
    this.router.navigate(['home']);
  }
  tryRegisteringAgain() {
    this.router.navigate(['register']);
  }

}
