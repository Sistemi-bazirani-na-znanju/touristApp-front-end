import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrangementService } from '../../infrastructure/rest/arrangements.service';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { Arrangement } from '../../infrastructure/rest/model/arrangement.model';
import { Excursion } from '../../infrastructure/rest/model/excursion.model';
import { Reservation } from '../../infrastructure/rest/model/reservation.model';
import { ReservationService } from '../../infrastructure/rest/reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pd-arrangement-reservation',
  templateUrl: './arrangement-reservation.component.html',
  styleUrl: './arrangement-reservation.component.css'
})
export class ArragementReservationComponent {

  arrangementId: number = -1;
  userId: number = 1;
  user: RegisteredUser = new RegisteredUser();
  arrangement?: any;
  numberOfPeople: number = 1;
  selectedExcursions: Excursion[] = [];
  isIndividualArrangement: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    public arrangementService: ArrangementService,
    private authService: AuthService,
    private userService: RegisteredUserService,
    private reservationService: ReservationService,
    private toastr: ToastrService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.arrangementId = params['id'];
      this.getArrangementById(this.arrangementId);
    });
     this.fetchUser();
  }
  getArrangementById(arrangementId: number) {
    this.arrangementService.getById(this.arrangementId).subscribe((result) => {
      this.arrangement = result;
      this.isIndividualArrangement = this.arrangement.type === 'INDIVIDUAL';
      console.log("ARRAGEMENT:");
      console.log(this.arrangement);
    });
  }

  toggleExcursionSelection(excursion: Excursion) {
    const index = this.selectedExcursions.indexOf(excursion);
    if (index === -1) {
      this.selectedExcursions.push(excursion);
    } else {
      this.selectedExcursions.splice(index, 1);
    }
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
      })
    });
  }
  submitReservation(): void {

    let totalPrice = this.arrangement.price * this.numberOfPeople;
    for (const excursion of this.selectedExcursions) {
      totalPrice += excursion.price * this.numberOfPeople;
    }

    const arr = this.arrangement as Arrangement; 
    const name = arr.name;
    
    const reservation : Reservation =  {
     id: 0,
     arrangementId: this.arrangementId,
     userId: this.userId,
     numberOfPeople: this.numberOfPeople,
     totalPrice: totalPrice,
     arrangementName: name,
     chosenExcursions: this.selectedExcursions
    }

    this.reservationService.create(reservation).subscribe({
      next: (result: Reservation) => {
        const successMessage = `Reservation successfully created, start price: ${totalPrice}, after discount: ${result.totalPrice}`;
        this.toastr.success(successMessage ,'Success');
        console.log('Created reservation:', result);
          this.router.navigate(['/arrangements']);
        

      },
      error: (err: any) => {
        this.toastr.error('error', (err))
      }
    });

  }
}
