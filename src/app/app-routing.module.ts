import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { RegistrationRequestComfirmationComponent } from './infrastructure/auth/registration-request-comfirmation/registration-request-comfirmation.component';
import { RegistrationRequestCompleteComponent } from './infrastructure/auth/registration-request-complete/registration-request-complete.component';
import { WelcomePageComponent } from './infrastructure/auth/welcome-page/welcome-page.component';
import { ArrangementComponent } from './components/arrangements/arrangements.component';
import { ArragementReservationComponent } from './components/arrangement-reservation/arrangement-reservation.component';
import { ArrangementCreationComponent } from './components/arrangement-creation/arrangement-creation.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ArrangementRatingComponent } from './components/arrangement-rating/arrangement-rating.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { UserVehicleReservationsComponent } from './components/user-vehicle-reservations/user-vehicle-reservations.component';
import { VehicleReservationFormComponent } from './components/vehicle-reservation-form/vehicle-reservation-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'registrationConfirmation',
    component: RegistrationRequestComfirmationComponent,
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
  },
  {
    path: 'registrationComplete/:id',
    component: RegistrationRequestCompleteComponent,
  },
  {
    path: 'arrangements',
    component: ArrangementComponent
  },
  {
    path: 'make-reservation/:id',
    component: ArragementReservationComponent
  },
  {
    path: 'vehicles',
    component: VehiclesComponent
  },
  {
    path: 'arrangement-creation',
    component: ArrangementCreationComponent
  },

  {
    path: 'all-reservations',
    component: ReservationsComponent
  },
  {
    path: 'arrangement-rating/:id',
    component: ArrangementRatingComponent
  },
  {
    path: 'user-vehicle-reservations',
    component: UserVehicleReservationsComponent
  },
  {
    path: 'vehicle-reservation-form/:id',
    component: VehicleReservationFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
