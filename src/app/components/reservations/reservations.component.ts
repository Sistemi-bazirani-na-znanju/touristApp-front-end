import { Component } from '@angular/core';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { Reservation } from '../../infrastructure/rest/model/reservation.model';
import { ArrangementService } from '../../infrastructure/rest/arrangements.service';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  reservations: Reservation[] = []
  selectedSortingOption: String = "";

  constructor(public arrangementService: ArrangementService,
              private authService: AuthService,
              private reservationService: ReservationService,
              private userService: RegisteredUserService,
              private route: ActivatedRoute,
              private router: Router){
  }

  ngOnInit(): void {
    this.fetchUser();

  }

  fetchUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;
      this.userService.getById(this.userId).subscribe(registeredUser => {
        this.user = registeredUser;
        console.log("USER");
        console.log(this.user)
        this.getReservations();
      })
    });
  }

  getReservations(): void{
  
    this.reservationService.getAllReservations().subscribe({
      next: (result: Reservation[]) => {
        this.reservations = result.filter(reservation => reservation.userId === this.userId);
        console.log("Filtered reservations: ", this.reservations);        
      },
      error: (error: any) => console.log(error)
    });        
  }

  redirectToVehicles(): void {
    this.router.navigate(['/vehicles']); // Navigate to '/vehicles' path
  }
}