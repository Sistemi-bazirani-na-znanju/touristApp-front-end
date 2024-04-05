import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/model/company.model';
import { ActivatedRoute } from '@angular/router';
import {
  faLocationDot,
  faStar,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservationComponent } from '../reservation/reservation.component';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';

@Component({
  selector: 'pd-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css',
})
export class CompanyDetailsComponent implements OnInit {
  companyId: number = -1;
  company?: Company;
  equipment?: Equipment[];
  equipmentIds: number[] = [];
  equipmentSearch: string = '';
  equipmentQuantities: number[] = [];
  user: RegisteredUser = new RegisteredUser();
  equipmentToOrder: Equipment | undefined;

  faLocationDot = faLocationDot;
  faStar = faStar;
  faClock = faClock;

  constructor(
    private route: ActivatedRoute,
    private service: CompanyService,
    public dialogRef: MatDialog,
    private authService: AuthService,
    private userService: RegisteredUserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.companyId = params['id'];
      this.getCompanyById(this.companyId);
      this.getEquipmentByCompanyId(this.companyId);
    });
    this.fetchUser();
  }

  getCompanyById(id: number) {
    this.service.getById(id).subscribe((result) => {
      this.company = result;
    });
  }

  getEquipmentByCompanyId(id: number) {
    this.service.getEquipmentByCompanyId(id).subscribe((results) => {
      this.equipment = results;
    });
  }

  toggleOrderItem(
    id: number | undefined,
    stockCount: number | undefined
  ): void {
    if (stockCount! <= 0) return;

    const index = this.equipmentIds.indexOf(id!);
    if (index !== -1) {
      this.equipmentIds.splice(index, 1);
      this.equipmentQuantities.splice(index, 1);
    } else {
      this.equipmentIds.push(id!);
      this.equipmentToOrder = this.equipment?.find((e) => e.id === id);
      this.equipmentQuantities.push(this.equipmentToOrder!.quantity);
    }
  }

  isItemSelected(id: number | undefined) {
    return this.equipmentIds.includes(id!);
  }

  onMakeAReservation(): void {
    console.log(this.user.penaltyPoints);
    if (this.user.penaltyPoints >= 3) {
      alert("You have 3 or more penalty points. You can't make a reservation.");
      return;
    }

    const reservationData = {
      companyId: this.companyId,
      equipmentIds: this.equipmentIds,
      equipmentQuantities: this.equipmentQuantities,
    };

    this.dialogRef.open(ReservationComponent, {
      data: reservationData,
    });
  }

  searchEquipment() {
    if (!this.equipmentSearch) {
      this.getEquipmentByCompanyId(this.companyId);
      return;
    }

    if (!this.equipment) {
      return;
    }

    const searchTerm = this.equipmentSearch.toLowerCase();

    const filteredEquipment = this.equipment.filter((e) =>
      e.name.toLowerCase().includes(searchTerm)
    );
    this.equipment = filteredEquipment;
  }

  fetchUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (!user.id) return;
      const userId = user.id;
      this.userService.getById(userId).subscribe((registeredUser) => {
        this.user = registeredUser;
      });
    });
  }
}
