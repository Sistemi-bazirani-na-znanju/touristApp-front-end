import { Component } from '@angular/core';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { ActivatedRoute } from '@angular/router';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { AppointmentService } from '../../infrastructure/rest/appointment.service';
import { ReservationService } from '../../infrastructure/rest/reservation.service';
import { Appointment } from '../../infrastructure/rest/model/appointmen.model';

@Component({
  selector: 'pd-registered-user-appointments',
  templateUrl: './registered-user-appointments.component.html',
  styleUrl: './registered-user-appointments.component.css'
})
export class RegisteredUserAppointmentsComponent {
  userId: number = -1;
  user: RegisteredUser = new RegisteredUser();
  canEdit: boolean = false;
  appointments: Appointment[] = [];
  displayedAppointments: Appointment[] = [];
  is24hBefore: boolean = false;
  selectedSortingOption: String = "Date (Descending)";
  selectedOption: String = "ALL"

  constructor(public appointmentService: AppointmentService,
              private authService: AuthService,
              private userService: RegisteredUserService,
              private reservationService: ReservationService,
              private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchUser();
      this.getAppointments(this.userId);
    })
  }
  getAppointments(userId: number) {
    this.reservationService.getUserAppointmentsByUserId(userId).subscribe({
      next: (result: any) => {
        this.appointments = result;
        this.displayedAppointments = this.appointments;
        this.sortAppointments();
        console.log("Appointments retrived succsessfuly");
        console.log(this.appointments)
      },
      error: (errData) => {
        console.log("Error: " + errData);
      }
    })
    
  }

  cancelAppointment(appointment:Appointment) {
    
    var appointmentTimestamp = Date.parse(appointment.startDateTime);
    var currentTimestamp = new Date().getTime();
    var timeDifference = appointmentTimestamp - currentTimestamp;
    var hoursDifference = timeDifference / (1000 * 60 * 60);
    this.is24hBefore = hoursDifference <= 24;
    console.log(appointmentTimestamp, currentTimestamp)
    console.log(hoursDifference);
    console.log(this.is24hBefore);
    console.log("Cancelling appointment:", appointment);

    this.userService.addPenaltyPoints(this.userId,this.is24hBefore).subscribe(registeredUser => {
      this.user = registeredUser;
      console.log("USER");
      console.log(this.user)
      this.appointmentService.cancleAppointment(appointment).subscribe({
        next: (result: any) => {
          console.log("Appointment cancled");
          this.reservationService.deleteReservation(appointment.id).subscribe({
            next: (result: any) => {
              console.log("Reservation deleted");
              location.reload();
            },
            error: (errData) => {
              console.log("Error: " + errData);
            }
          })
        },
        error: (errData) => {
          console.log("Error: " + errData);
        }
      })
      
      //
    });
    
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

  isDateTimeInPast(dateTimeString: string): boolean {
    const dateTime = new Date(dateTimeString);
    const currentDate = new Date();
    return dateTime < currentDate;
  }

  sortAppointments() {
    switch (this.selectedSortingOption) {
      case 'Date (Ascending)':
        this.displayedAppointments.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
        break;
      case 'Date (Descending)':
        this.displayedAppointments.sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime());
        break;
      case 'Duration (Ascending)':
        this.displayedAppointments.sort((a, b) => a.duration - b.duration);
        break;
      case 'Duration (Descending)':
        this.displayedAppointments.sort((a, b) => b.duration - a.duration);
        break;
    }
  }

  filterAppointments() {
    switch (this.selectedOption) {
      case 'ALL':
        this.displayedAppointments = this.appointments; 
        break;
      case 'RESERVED':
        this.displayedAppointments = this.appointments.filter(a => a.status == 'RESERVED');
        break;
      case 'TAKEN':
        this.displayedAppointments = this.appointments.filter(a => a.status == 'TAKEN');
        break;
      case 'CANCELED':
        this.displayedAppointments = this.appointments.filter(a => a.status == 'CANCELED');
        break;
    }
    this.sortAppointments();
  }
}
