import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrangementComponent } from './arrangements/arrangements.component';
import { ArragementReservationComponent } from './arrangement-reservation/arrangement-reservation.component';
import { ArrangementCreationComponent } from './arrangement-creation/arrangement-creation.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ArrangementRatingComponent } from './arrangement-rating/arrangement-rating.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { UserVehicleReservationsComponent } from './user-vehicle-reservations/user-vehicle-reservations.component';
import { VehicleReservationCancellationComponent } from './vehicle-reservation-cancellation/vehicle-reservation-cancellation.component';
import { ReturnVehicleComponent } from './return-vehicle/return-vehicle.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ArrangementComponent,
    ArragementReservationComponent,
    ArrangementCreationComponent,
    ReservationsComponent,
    ArrangementRatingComponent,
    VehiclesComponent,
    UserVehicleReservationsComponent,
    VehicleReservationCancellationComponent,
    ReturnVehicleComponent,
  ],
  imports: [CommonModule, RouterModule,MaterialModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [HomeComponent,
            LoginComponent,
            NavbarComponent,
            ArrangementComponent,
            ArragementReservationComponent,
            ArrangementCreationComponent,
            ArrangementRatingComponent],
})
export class ComponentsModule {}
