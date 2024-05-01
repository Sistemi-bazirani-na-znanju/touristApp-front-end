import { Component } from '@angular/core';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { Vehicle } from '../../infrastructure/rest/model/vehicle.model';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../infrastructure/rest/vehicle.service';

@Component({
  selector: 'pd-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  userId: number = -1;
  user: RegisteredUser = new RegisteredUser();
  canEdit: boolean = false;
  vehicles: Vehicle[] = [];
  displayedVehicles: Vehicle[] = [];
  selectedSortingOption: String = "";

  constructor(public vehicleService: VehicleService,
    private authService: AuthService,
    private userService: RegisteredUserService,
    private route: ActivatedRoute,
    private router: Router,){
}

ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.fetchUser();
    this.getVehicles();
  })
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
getVehicles() {
  this.vehicleService.getAll().subscribe({
      next: (arrangements: Vehicle[]) => {
          this.displayedVehicles = arrangements; 
          console.log("Vehicles retrieved successfully");
          console.log(this.displayedVehicles); 
      },
      error: (errData) => {
          console.log("Error: " + errData);
      }
  });
}
}
