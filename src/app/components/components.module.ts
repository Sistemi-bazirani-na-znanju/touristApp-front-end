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
import { ArrangementComponent } from './arrangements/arrangements.component';
import { ArragementReservationComponent } from './arrangement-reservation/arrangement-reservation.component';
import { ArrangementCreationComponent } from './arrangement-creation/arrangement-creation.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisteredUserProfileComponent,
    ArrangementComponent,
    ArragementReservationComponent,
    ArrangementCreationComponent
  ],
  imports: [CommonModule, RouterModule,MaterialModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [HomeComponent,
            LoginComponent,
            NavbarComponent,
            RegisteredUserProfileComponent,
            ArrangementComponent,
            ArragementReservationComponent,
            ArrangementCreationComponent],
})
export class ComponentsModule {}
