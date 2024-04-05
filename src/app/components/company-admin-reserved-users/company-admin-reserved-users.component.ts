import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../infrastructure/auth';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { ReservationService } from '../../infrastructure/rest/reservation.service';
import { CompanyAdmin } from '../../infrastructure/rest/model/company-admin.model';
import { Company } from '../../company/model/company.model';
import { User } from '../../infrastructure/auth/model/user.model';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';

@Component({
  selector: 'pd-company-admin-reserved-users',
  templateUrl: './company-admin-reserved-users.component.html',
  styleUrl: './company-admin-reserved-users.component.css',
})
export class CompanyAdminReservedUsersComponent implements OnInit {
  companyAdmin?: CompanyAdmin;
  users: RegisteredUser[] = [];

  constructor(
    private authService: AuthService,
    private companyAdminService: CompanyAdminService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.user$.subscribe((u) => {
      const user = u;
      if (!u.id) return;
      const userId = u.id;

      this.companyAdminService.getById(userId).subscribe((registeredUser) => {
        this.companyAdmin = registeredUser;

        this.reservationService
          .getUsersThatReserved(this.companyAdmin?.companyId!)
          .subscribe({
            next: (result) => {
              this.users = result;
            },
          });
      });
    });
  }
}
