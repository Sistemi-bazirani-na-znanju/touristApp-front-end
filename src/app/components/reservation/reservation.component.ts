import { Component, Inject } from '@angular/core';
import {
  faXmark,
  faEye,
  faEyeSlash,
  faLessThan,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../../infrastructure/rest/model/appointmen.model';
import { AppointmentService } from '../../infrastructure/rest/appointment.service';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { ReservationService } from '../../infrastructure/rest/reservation.service';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/company.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'pd-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent {
  appointments: Appointment[] = [];
  userAppointments: Appointment[] = [];
  freeAppointments: Appointment[] = [];
  selectedAppointmentId: number = -1;
  company: any;
  user: any;
  userId: number = -1;
  extraordinary: boolean = false;
  times: string[] = [];
  duration: number = 15;
  minDate: string;
  date: string = '';
  time: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<ReservationComponent>,
    public appointmentService: AppointmentService,
    private authService: AuthService,
    private userService: RegisteredUserService,
    private reservationService: ReservationService,
    private companyService: CompanyService,
    private router: Router,
    private location: Location
  ) {
    console.log(this.data);
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.getAppointments();
    this.fetchUser();
    this.getCompany();
    this.getUserAppointments(this.userId);
  }

  onClose(): void {
    this.dialog.close();
  }

  getAppointments(): void {
    this.appointmentService
      .getAppointmentsByCompanyId(this.data.companyId)
      .subscribe({
        next: (result: Appointment[]) => {
          const currentDate = new Date();
          this.appointments = result;
          console.log(this.appointments);
          this.freeAppointments = result.filter(
            (appointment) =>
              new Date(appointment.startDateTime) > currentDate &&
              appointment.status === 'FREE'
          );
        },
        error: () => {
          console.log('Error.');
        },
      });
  }

  getCompany(): void {
    this.companyService.getById(this.data.companyId).subscribe({
      next: (result: Company) => {
        console.log(result);
        this.company = result;
      },
      error: () => {
        console.log('Error.');
      },
    });
  }

  selectAppointment(id: number): void {
    this.selectedAppointmentId = this.selectedAppointmentId == id ? -1 : id;
  }

  isSelected(id: number) {
    return id == this.selectedAppointmentId;
  }
  getUserAppointments(userId: number) {
    this.reservationService.getUserAppointmentsByUserId(userId).subscribe({
      next: (result: any) => {
        this.userAppointments = result;
        console.log('Appointments retrived succsessfuly');
      },
      error: (errData) => {
        console.log('Error: ' + errData);
      },
    });
  }

  chekIfInUserAppointments(appointmentId: number) {
    var selectAppointment = this.findAppointmentById(appointmentId);
    const isInAppointments = this.userAppointments.some(
      (appointment) =>
        appointment.startDateTime === selectAppointment?.startDateTime
    );
    console.log(isInAppointments);
    return !isInAppointments;
  }
  findAppointmentById(appointmentId: number): Appointment | undefined {
    return this.appointments.find(
      (appointment) => appointment.id === appointmentId
    );
  }
  chekIfInUserAppointmentsBasedOnTime(newAppointment: any) {
    const isInAppointments = this.userAppointments.some(
      (appointment) =>
        appointment.startDateTime === newAppointment.startDateTime
    );
    console.log(isInAppointments);
    return !isInAppointments;
  }

  onMakeAReservation(): void {
    if (!this.extraordinary) {
      const reservation = {
        userId: this.userId,
        equipmentIds: this.data.equipmentIds,
        equipmentQuantities: this.data.equipmentQuantities,
        appointmentId: this.selectedAppointmentId,
      };
      console.log(
        'Cheking if user made reservation for this appointment before'
      );
      if (this.chekIfInUserAppointments(this.selectedAppointmentId)) {
        console.log(reservation);
        this.reservationService.createReservation(reservation).subscribe({
          next: (result: any) => {
            console.log('Successfully made a reservation.');
            this.onClose();
          },
          error: () => {
            console.log('Error.');
          },
        });
      } else {
        alert(
          'You cancled appointment at this time. You cant make it then again.'
        );
      }
    } else {
      const reservation = {
        userId: this.userId,
        equipmentIds: this.data.equipmentIds,
        equipmentQuantities: this.data.equipmentQuantities,
        appointment: {
          startDateTime: this.time,
          duration: this.duration,
          companyAdministratorFullName: '',
          companyId: this.company.id,
        },
      };
      console.log(reservation);
      if (this.chekIfInUserAppointmentsBasedOnTime(reservation.appointment)) {
        this.reservationService
          .createExtraordinaryReservation(reservation)
          .subscribe({
            next: (result: any) => {
              console.log('Successfully made a reservation.');
              this.onClose();
            },
            error: () => {
              console.log('Error.');
            },
          });
      } else {
        alert(
          'You cancled appointment at this time. You cant make it then again.'
        );
      }
    }
  }

  fetchUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;
      this.userService.getById(this.userId).subscribe((registeredUser) => {
        this.user = registeredUser;
      });
    });
  }

  findEmptySlots(): void {
    this.time = '';
    const startTime = new Date(`${this.date}T${this.company.openingTime}`);
    const endTime = new Date(`${this.date}T${this.company.closingTime}`);

    const existingSlots = this.appointments.map((appointment) => {
      const appointmentStart = new Date(appointment.startDateTime);
      const appointmentEnd = new Date(
        appointmentStart.getTime() + appointment.duration * 60000
      );
      return { start: appointmentStart, end: appointmentEnd };
    });

    const emptySlots = [];

    let currentTime = startTime;

    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + this.duration * 60000);
      const isOverlap = existingSlots.some((appointment) => {
        return (
          (currentTime >= appointment.start && currentTime < appointment.end) ||
          (slotEnd > appointment.start && slotEnd <= appointment.end) ||
          (currentTime <= appointment.start && slotEnd >= appointment.start)
        );
      });

      if (!isOverlap && currentTime >= new Date()) {
        emptySlots.push(currentTime.toISOString());
      }

      currentTime = new Date(currentTime.getTime() + this.duration * 60000);
    }

    const stringSlots = emptySlots.map((date) =>
      this.convertToISOString(new Date(date).toString())
    ) as string[];
    this.times = stringSlots;
  }

  convertToISOString(inputDateString: string): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const dateParts = inputDateString.split(' ');
    const month = (months.indexOf(dateParts[1]) + 1)
      .toString()
      .padStart(2, '0');
    const day = dateParts[2].padStart(2, '0');
    const year = dateParts[3];
    const time = dateParts[4];

    const iso8601String = `${year}-${month}-${day}T${time}`;

    return iso8601String;
  }

  selectTime(time: string) {
    this.time = this.time == time ? '' : time;
  }

  isReservationValid(): boolean {
    if (
      (this.extraordinary && this.duration > 0 && this.time != '') ||
      (!this.extraordinary && this.selectedAppointmentId != -1)
    )
      return true;
    return false;
  }

  toggleExtraordinary(): void {
    this.extraordinary = !this.extraordinary;
  }

  faXmark = faXmark;
}
