import { Component, OnInit } from '@angular/core';
import {
  faTruckMedical,
  faCalendarDay,
  faHospital,
  faCheck,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { SystemAdminService } from '../../infrastructure/rest/system-admin.service';

@Component({
  selector: 'pd-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.css',
})
export class DeliveriesComponent implements OnInit {
  faTruckMedical = faTruckMedical;
  faCalendarDay = faCalendarDay;
  faHospital = faHospital;
  faCheck = faCheck;
  faClock = faClock;
  deliveries: any[] = [];

  constructor(private service: SystemAdminService) {}

  ngOnInit(): void {
    this.fetchDeliveries();
  }

  fetchDeliveries(): void {
    this.service.getAllDeliveries().subscribe({
      next: (result: any) => {
        this.deliveries = result;
      },
    });
  }

  isDateToday(dateString: string): boolean {
    // Convert the input date string to a Date object
    const inputDate = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    // Compare the year, month, and day of the input date with the current date
    return (
      inputDate.getFullYear() === currentDate.getFullYear() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getDate() === currentDate.getDate()
    );
  }
}
