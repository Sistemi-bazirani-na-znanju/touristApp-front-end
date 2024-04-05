import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RegistrationRequestComfirmationComponent } from './registration-request-comfirmation/registration-request-comfirmation.component';
import { RegistrationRequestCompleteComponent } from './registration-request-complete/registration-request-complete.component';



@NgModule({
  declarations: [
    RegisterComponent,
    RegistrationRequestComfirmationComponent,
    RegistrationRequestCompleteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class AuthModule { }
