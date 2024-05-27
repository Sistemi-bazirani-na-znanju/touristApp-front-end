import { Component } from '@angular/core';
import { VehicleReservationService } from '../../infrastructure/rest/vehicle-reservation.service';
import { ReservationStatus, VehicleReservation } from '../../infrastructure/rest/model/vehicle-reservation.model';
import { AuthService } from '../../infrastructure/auth';
import { User } from '../../infrastructure/auth/model/user.model';

@Component({
  selector: 'pd-user-vehicle-reservations',
  templateUrl: './user-vehicle-reservations.component.html',
  styleUrl: './user-vehicle-reservations.component.css'
})
export class UserVehicleReservationsComponent {

  constructor(
    private vehicleReservationService : VehicleReservationService,
    private authService : AuthService
  ){}


  vehicleReservations : VehicleReservation[] = [];

  showCancelModal: boolean = false;
  showReturnModal : boolean = false;
  currentReservationId: number | null = null;


  ngOnInit() : void{
    this.authService.user$.subscribe(user => {
      if (!user.id) return;
      this.vehicleReservationService.getUserReservations(user.id).subscribe({
        next : (reservations : VehicleReservation[])=>{
            this.vehicleReservations = reservations;
        }
      })

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
    
  }

  openReturnModal(reservationId : number) : void{
    this.currentReservationId = reservationId;
    this.showReturnModal = true;
  }

  closeReturnModal() : void {
    this.showReturnModal = false;
    this.currentReservationId = null;
  }

  submitVehicleReturn() : void{

  }

  checkIfStatusIsScheduled(reservation : VehicleReservation) : boolean{
    if(reservation.status === "SCHEDULED"){
      return true;
      
    }
    return false;
  }

  checkIfStatusIsTaken(reservation : VehicleReservation) : boolean{
    if(reservation.status === "TAKEN"){
      return true;
      
    }
    return false;
  }


}
