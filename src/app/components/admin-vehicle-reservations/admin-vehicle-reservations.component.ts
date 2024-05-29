import { Component, OnInit } from '@angular/core';
import { VehicleReservationService } from '../../infrastructure/rest/vehicle-reservation.service';
import { ReservationStatus, VehicleReservation } from '../../infrastructure/rest/model/vehicle-reservation.model';
import { AuthService } from '../../infrastructure/auth';
import { User } from '../../infrastructure/auth/model/user.model';

@Component({
  selector: 'pd-admin-vehicle-reservations',
  templateUrl: './admin-vehicle-reservations.component.html',
  styleUrl: './admin-vehicle-reservations.component.css'
})
export class AdminVehicleReservationsComponent implements OnInit {

  vehicleReservations: VehicleReservation[] = [];
  showCancelModal: boolean = false;
  showReturnModal: boolean = false;
  currentReservationId: number | null = null;

  constructor(
    private vehicleReservationService: VehicleReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (!user.id) return;
      this.vehicleReservationService.getScheduledReservations().subscribe({
        next: (reservations: VehicleReservation[]) => {
          this.vehicleReservations = reservations;
          this.sortReservationsByStatus();
        }
      });
    });
  }

  sortReservationsByStatus(): void {
    const statusOrder = {
      'TAKEN': 1,
      'SCHEDULED': 2,
      'CANCELLED': 3,
      'RETURNED': 4
    };

    this.vehicleReservations.sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }

  convertDateToString(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  openCancelModal(reservationId: number): void {
    this.currentReservationId = reservationId;
    this.showCancelModal = true;
  }

  closeCancelModal(): void {
    this.showCancelModal = false;
    this.currentReservationId = null;
  }

  cancelReservation(reason: string): void {
    if (this.currentReservationId) {
      this.vehicleReservationService.cancelReservation(this.currentReservationId, reason).subscribe({
        next: (result: VehicleReservation) => {
          window.location.reload();
        }
      });
    } else {
      console.log("Invalid reservation selected");
    }
  }

  openReturnModal(reservationId: number): void {
    this.currentReservationId = reservationId;
    this.showReturnModal = true;
  }

  closeReturnModal(): void {
    this.showReturnModal = false;
    this.currentReservationId = null;
  }

  submitVehicleReturn(state: string): void {
    if (this.currentReservationId) {
      this.vehicleReservationService.returnVehicle(this.currentReservationId, state).subscribe({
        next: (result: VehicleReservation) => {
          window.location.reload();
        }
      });
    } else {
      console.log("Invalid reservation selected");
    }
  }

  checkIfStatusIsScheduled(reservation: VehicleReservation): boolean {
    return reservation.status === "SCHEDULED";
  }

  checkIfStatusIsTaken(reservation: VehicleReservation): boolean {
    return reservation.status === "TAKEN";
  }

  pickupVehicle(reservationId: number): void {
    this.vehicleReservationService.pickupVehicle(reservationId).subscribe({
      next: (result: VehicleReservation) => {
        window.location.reload();
      }
    });
  }

  getStatusClass(status: ReservationStatus): string {
    switch (status) {
      case 'SCHEDULED':
        return 'status-scheduled';
      case 'TAKEN':
        return 'status-taken';
      case 'CANCELLED':
        return 'status-cancelled';
      case 'RETURNED':
        return 'status-returned';
      default:
        return 'status-other';
    }
  }

  checkIfUserIsSuspicious(reservation: VehicleReservation): boolean {
    return reservation.user?.suspicious || false;
  }

}
