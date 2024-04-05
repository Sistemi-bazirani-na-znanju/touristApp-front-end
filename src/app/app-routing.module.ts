import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CompanySearchComponent } from './components/company-search/company-search.component';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { RegistrationRequestComfirmationComponent } from './infrastructure/auth/registration-request-comfirmation/registration-request-comfirmation.component';
import { RegistrationRequestCompleteComponent } from './infrastructure/auth/registration-request-complete/registration-request-complete.component';
import { RegisterCompanyComponent } from './company/register-company/register-company.component';
import { UregisteredUserEquipmentComponent } from './unregistered-user/uregistered-user/uregistered-user-equipment/uregistered-user-equipment.component';
import { UregisteredUserCompaniesComponent } from './unregistered-user/uregistered-user/uregistered-user-companies/uregistered-user-companies.component';
import { EquipmentSearchComponent } from './components/equipment-search/equipment-search.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { RegisteredUserProfileComponent } from './components/registered-user-profile/registered-user-profile.component';
import { EquipmentCompaniesOverviewComponent } from './components/equipment-overview-companies/equipment-companies-overview.component';
import { RegisterCompanyAdministratorComponent } from './components/company-administrator-registration/company-administrator-registration.component';
import { CompanyAdminProfileComponent } from './components/company-admin-profile/company-admin-profile.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { EquipmentSearchCompanyAdministratorComponent } from './components/equipment-search-company-administrator/equipment-search-company-administrator.component';
import { CompanyCalendarComponent } from './components/company-calendar/company-calendar.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './components/edit-equipment/edit-equipment.component';
import { RoleGuard } from './infrastructure/auth/auth-guard/auth-guard.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { MapDeliveryComponent } from './components/map/map.component';
import { RegisterSystemAdministratorComponent } from './components/system-administrator-registration/system-administrator-registration.component';
import { ReservationTakeoverQRComponent } from './components/reservation-takeover-qr/reservation-takeover-qr.component';
import { CompanyAdminAppointmentsManagementComponent } from './components/company-admin-appointments-management/company-admin-appointments-management.component';
import { CompanyAdminReservedUsersComponent } from './components/company-admin-reserved-users/company-admin-reserved-users.component';

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
    path: 'company-search',
    component: CompanySearchComponent,
  },
  {
    path: 'equipment-search',
    component: EquipmentSearchComponent,
  },
  {
    path: 'registrationConfirmation',
    component: RegistrationRequestComfirmationComponent,
  },
  {
    path: 'registrationComplete/:id',
    component: RegistrationRequestCompleteComponent,
  },
  {
    path: 'registerCompany',
    component: RegisterCompanyComponent,
    data: {
      expectedRole: 'ROLE_SYSTEMADMIN',
    },
  },
  {
    path: 'unregisteredUserCompanies',
    component: UregisteredUserCompaniesComponent,
  },
  {
    path: 'unregisteredUserEquipment',
    component: UregisteredUserEquipmentComponent,
  },
  {
    path: 'company-details/:id',
    component: CompanyDetailsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_USER',
    },
  },
  {
    path: 'profile',
    component: RegisteredUserProfileComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_USER',
    },
  },
  {
    path: 'equipment-companies-overview/:id',
    component: EquipmentCompaniesOverviewComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_USER',
    },
  },
  {
    path: 'register-company-administrator/:id',
    component: RegisterCompanyAdministratorComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_SYSTEMADMIN',
    },
  },
  {
    path: 'company-admin-profile',
    component: CompanyAdminProfileComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_COMPANYADMIN',
    },
  },
  {
    path: 'company-profile',
    component: CompanyProfileComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_COMPANYADMIN',
    },
  },
  {
    path: 'equipment-search-company-administrator',
    component: EquipmentSearchCompanyAdministratorComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_COMPANYADMIN',
    },
  },
  {
    path: 'company-calendar/:id',
    component: CompanyCalendarComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_COMPANYADMIN',
    },
  },
  {
    path: 'company-profile/add-equipment',
    component: AddEquipmentComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_COMPANYADMIN',
    },
  },
  {
    path: 'edit-equipment/:id',
    component: EditEquipmentComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_COMPANYADMIN',
    },
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_SYSTEMADMIN',
    },
  },
  {
    path: 'deliveries',
    component: DeliveriesComponent,
    data: {
      expectedRole: 'ROLE_SYSTEMADMIN',
    },
  },
  {
    path: 'map-delivery/:id',
    component: MapDeliveryComponent,
    data: {
      expectedRole: 'ROLE_SYSTEMADMIN',
    },
  },
  {
    path: 'register-system-administrator',
    component: RegisterSystemAdministratorComponent,
  },
  {
    path: 'reservation-takeover-qr',
    component: ReservationTakeoverQRComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_COMPANYADMIN',
    },
  },
  {
    path: 'reservation-management',
    component: CompanyAdminAppointmentsManagementComponent,
    data: {
      expectedRole: 'ROLE_COMPANYADMIN',
    }
  },
  {
    path: 'reserved-users',
    component: CompanyAdminReservedUsersComponent,
    data: {
      expectedRole: 'ROLE_COMPANYADMIN',
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
