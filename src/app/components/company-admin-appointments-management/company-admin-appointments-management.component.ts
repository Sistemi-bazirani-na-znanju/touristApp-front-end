import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../infrastructure/rest/model/appointmen.model';
import { AppointmentService } from '../../infrastructure/rest/appointment.service';
import { AuthService } from '../../infrastructure/auth';
import { CompanyAdmin } from '../../infrastructure/rest/model/company-admin.model';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { Company } from '../../company/model/company.model';
import { Reservation } from '../../infrastructure/rest/model/reservation.model';
import { ReservationService } from '../../infrastructure/rest/reservation.service';

@Component({
  selector: 'pd-company-admin-appointments-management',
  templateUrl: './company-admin-appointments-management.component.html',
  styleUrl: './company-admin-appointments-management.component.css',
})
export class CompanyAdminAppointmentsManagementComponent implements OnInit {
  companyAdmin?: CompanyAdmin;
  reservations: Reservation[] = [];

  constructor(
    private authService: AuthService,
    private companyAdminService: CompanyAdminService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.authService.user$.subscribe((u) => {
      const user = u;
      if (!u.id) return;
      const userId = u.id;

      this.companyAdminService.getById(userId).subscribe((registeredUser) => {
        this.companyAdmin = registeredUser;

        this.reservationService
          .getReservationsByCompanyId(this.companyAdmin?.companyId!)
          .subscribe({
            next: (result) => {
              this.reservations = result;
            },
          });
      });
    });
  }

  canBeTaken(reservation: Reservation) {
    return reservation.status === 'PENDING';
  }

  markAsTaken(reservation: Reservation) {
    this.reservationService.markAsTaken(reservation).subscribe({
      next: () => {
        location.reload();
      },
      error: () => {
        console.log('error');
      }
    });
  }
}
