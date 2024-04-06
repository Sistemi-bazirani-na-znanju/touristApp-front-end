import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArrangementService } from '../../infrastructure/rest/arrangements.service';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { Arrangement } from '../../infrastructure/rest/model/arrangement.model';
import { Excursion } from '../../infrastructure/rest/model/excursion.model';
import { ReservationCreation } from '../../infrastructure/rest/model/reservation-creation.model';

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
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.arrangementId = params['id'];
      this.getArrangementById(this.arrangementId);
    });
    //this.fetchUser();
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

    let totalPrice = this.arrangement.price;
    for (const excursion of this.selectedExcursions) {
      totalPrice += excursion.price;
    }
    
    const reservation = new ReservationCreation(
      this.numberOfPeople,
      totalPrice,
      this.arrangement,
      this.selectedExcursions
    );
    console.log('Created reservation:', reservation);
  }
}
