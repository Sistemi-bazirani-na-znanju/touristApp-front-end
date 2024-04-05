import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CompanySearchComponent } from './company-search/company-search.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { EquipmentCardComponent } from './equipment-card/equipment-card.component';
import { RegisteredUserProfileComponent } from './registered-user-profile/registered-user-profile.component';
import { EquipmentCompaniesOverviewComponent } from './equipment-overview-companies/equipment-companies-overview.component';
import { RegisterCompanyAdministratorComponent } from './company-administrator-registration/company-administrator-registration.component';
import { CompanyAdminProfileComponent } from './company-admin-profile/company-admin-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { EquipmentSearchCompanyAdministratorComponent } from './equipment-search-company-administrator/equipment-search-company-administrator.component';
import { EditableEquipmentCardComponent } from './editable-equipment-card/editable-equipment-card.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './edit-equipment/edit-equipment.component';
import { RegisteredUserAppointmentsComponent } from './registered-user-appointments/registered-user-appointments.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { ChangeCopmanyAdminPasswordComponent } from './change-company-admin-password/change-company-admin-password.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RegisterSystemAdministratorComponent } from './system-administrator-registration/system-administrator-registration.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CompanyCalendarComponent } from './company-calendar/company-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReservationTakeoverQRComponent } from './reservation-takeover-qr/reservation-takeover-qr.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { CompanyAdminAppointmentsManagementComponent } from './company-admin-appointments-management/company-admin-appointments-management.component';
import { CompanyAdminReservedUsersComponent } from './company-admin-reserved-users/company-admin-reserved-users.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CompanySearchComponent,
    EquipmentSearchComponent,
    CompanyCardComponent,
    CompanyDetailsComponent,
    EquipmentCardComponent,
    RegisteredUserProfileComponent,
    EquipmentCompaniesOverviewComponent,
    RegisterCompanyAdministratorComponent,
    CompanyAdminProfileComponent,
    CompanyProfileComponent,
    EquipmentSearchCompanyAdministratorComponent,
    EditableEquipmentCardComponent,
    AddEquipmentComponent,
    EditEquipmentComponent,
    RegisteredUserAppointmentsComponent,
    AppointmentFormComponent,
    ChangeCopmanyAdminPasswordComponent,
    CompanyCalendarComponent,
    ChangePasswordComponent,
    ReservationComponent,
    RegisterSystemAdministratorComponent,
    ReservationTakeoverQRComponent,
    DeliveriesComponent,
    CompanyAdminAppointmentsManagementComponent,
    CompanyAdminReservedUsersComponent,
  ],
  imports: [CommonModule, RouterModule,MaterialModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, FullCalendarModule, QRCodeModule],
  exports: [HomeComponent,
            LoginComponent,
            NavbarComponent,
            CompanyCardComponent,
            CompanyDetailsComponent,
            EquipmentCardComponent,
            EquipmentCompaniesOverviewComponent,
            RegisterCompanyAdministratorComponent,
            CompanyAdminProfileComponent,
            CompanyProfileComponent,
            AddEquipmentComponent,
            EditEquipmentComponent,
            CompanyCalendarComponent,
            ChangePasswordComponent,
            RegisterSystemAdministratorComponent,
            ReservationTakeoverQRComponent,],
})
export class ComponentsModule {}
