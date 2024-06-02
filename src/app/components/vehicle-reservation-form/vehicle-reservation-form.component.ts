import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { ReservationStatus, VehicleReservation } from '../../infrastructure/rest/model/vehicle-reservation.model';
import { VehicleReservationService } from '../../infrastructure/rest/vehicle-reservation.service';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from '../../infrastructure/rest/model/vehicle.model';
import { VehicleReservationUser } from '../../infrastructure/rest/model/vehicle-reservation-user.model';
import { VehicleService } from '../../infrastructure/rest/vehicle.service';

@Component({
  selector: 'pd-vehicle-reservation-form',
  templateUrl: './vehicle-reservation-form.component.html',
  styleUrls: ['./vehicle-reservation-form.component.css']
})
export class VehicleReservationFormComponent {

  vehicleId: number = -1;
  userId: number = 1;
  user: RegisteredUser = new RegisteredUser();
  vehicle?: Vehicle;
  selectedVehicle?: Vehicle;
  pickupTime?: Date;
  returnTime?: Date;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: RegisteredUserService,
    private vehicleReservationService: VehicleReservationService,
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.vehicleId = params['id'];
      this.fetchVehicleById(this.vehicleId);
    });
    this.fetchUser();
  }

  fetchVehicleById(vehicleId: number): void {
    this.vehicleService.getById(vehicleId).subscribe((vehicle) => {
      this.vehicle = vehicle;
      this.selectedVehicle = vehicle; // Set selected vehicle
    });
  }

  fetchUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;
      this.userService.getById(this.userId).subscribe(registeredUser => {
        this.user = registeredUser;
      })
    });
  }

  submitReservation(): void {
    if (!this.validateForm()) {
      return;
    }

    // Create vehicle reservation object
    const vehicleReservation: VehicleReservation = {
      id: 0, // Assuming 0 indicates a new reservation, replace with appropriate value for your application
      vehicle: this.selectedVehicle!,
      user: { id: this.userId } as VehicleReservationUser, // Assuming user has an ID
      reservationTime: new Date(), // Current time as reservation creation time
      scheduledPickupTime: this.pickupTime!,
      scheduledReturnTime: this.returnTime!,
      status: ReservationStatus.SCHEDULED // Initial status for a new reservation
    };

    this.vehicleReservationService.create(vehicleReservation).subscribe({
      next: (result: VehicleReservation) => {
        this.toastr.success('Reservation successfully created', 'Success');
        console.log('Created vehicle reservation:', result);
        this.router.navigate(['/vehicles']); // Navigate to vehicles page after successful reservation
      },
      error: (err: any) => {
        this.toastr.error('Error occurred during reservation', err);
      }
    });
  }

  validateForm(): boolean {
    // Check if vehicle, pickup time, and return time are selected
    if (!this.selectedVehicle || !this.pickupTime || !this.returnTime) {
      this.toastr.error('Please fill in all fields', 'Error');
      return false;
    }

    // Check if pickup time is before return time
    if (this.pickupTime >= this.returnTime) {
      this.toastr.error('Pickup time must be before return time', 'Error');
      return false;
    }

    return true;
  }
}
