import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RegisteredUserProfileComponent } from './registered-user-profile/registered-user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisteredUserProfileComponent,

  ],
  imports: [CommonModule, RouterModule,MaterialModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [HomeComponent,
            LoginComponent,
            NavbarComponent,
            RegisteredUserProfileComponent,],
})
export class ComponentsModule {}
