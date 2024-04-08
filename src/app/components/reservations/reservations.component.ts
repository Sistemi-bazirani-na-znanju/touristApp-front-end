import { Component } from '@angular/core';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { ReservationCreation } from '../../infrastructure/rest/model/reservation-creation.model';
import { ArrangementService } from '../../infrastructure/rest/arrangements.service';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../infrastructure/rest/reservation.service';

@Component({
  selector: 'pd-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  userId: number = -1;
  user: RegisteredUser = new RegisteredUser();
  canEdit: boolean = false;
  reservations: ReservationCreation[] = []
  selectedSortingOption: String = "";

  constructor(public arrangementService: ArrangementService,
              private authService: AuthService,
              private reservationService: ReservationService,
              private userService: RegisteredUserService,
              private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void{
  
    this.reservationService.getAllReservations().subscribe({
      next: (result: ReservationCreation[]) => {
        this.reservations = result
        console.log("all reservations: ", this.reservations);
        
      },
      error: (error: any) => console.log(error)
    });        
  }
}