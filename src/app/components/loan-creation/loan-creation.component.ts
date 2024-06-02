// loan-creation.component.ts
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoanService } from '../../infrastructure/rest/loan.service';
import { Loan, UserEmploymentStatus } from '../../infrastructure/rest/model/loan.model';
import { User } from '../../infrastructure/auth/model/user.model';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { VehicleReservationUser } from '../../infrastructure/rest/model/vehicle-reservation-user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-creation',
  templateUrl: './loan-creation.component.html',
  styleUrls: ['./loan-creation.component.css']
})
export class LoanCreationComponent {
  showEmploymentDates = false;
  showSalary = false
  showEndDate = false;
  user: any;
  userId: any;
  @ViewChild('loanForm')
  loanForm!: NgForm;
  vehicleUser: VehicleReservationUser | undefined

  constructor(private loanService: LoanService,private authService: AuthService,private userService: RegisteredUserService,private router: Router) {}
  ngOnInit(): void {
    this.fetchUser();
  }
  onEmploymentStatusChange(event: Event): void {
    const status = (event.target as HTMLSelectElement).value as UserEmploymentStatus;
    this.showEmploymentDates = status !== UserEmploymentStatus.UNEMPLOYED;
    this.showEndDate = status === UserEmploymentStatus.TEMPORARY_EMPLOYMENT;
    this.showSalary = status !== UserEmploymentStatus.UNEMPLOYED;

  }

  onSubmit(): void {
    if (this.loanForm.invalid) {
      return;
    }
    const today = new Date();
    const loan = new Loan(
      0, 
      { id: this.userId } as VehicleReservationUser,
      this.loanForm.value.installmentNumber,
      false,
      today,
      new Date(today.getFullYear(), today.getMonth() + this.loanForm.value.installmentNumber, today.getDate()),
      this.loanForm.value.totalAmount,
      this.loanForm.value.employmentStatus as UserEmploymentStatus,
      this.loanForm.value.employmentStartDate ? new Date(this.loanForm.value.employmentStartDate) : null,
      this.loanForm.value.employmentEndDate ? new Date(this.loanForm.value.employmentEndDate) : null,
      this.loanForm.value.salaryValue ? this.loanForm.value.salaryValue : 0,
      this.loanForm.value.ageNumber
    );

    console.log(loan);
    this.loanService.create(loan).subscribe(response => {
      console.log('Loan created:', response);
      this.router.navigate(['/user-loans']);
    }, error => {
      console.error('Error creating loan:', error);
      //this.router.navigate(['/user-loans']);
    });
  }

  fetchUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;
      this.userService.getById(this.userId).subscribe(registeredUser => {
         this.user = registeredUser;
        // this.vehicleUser = new VehicleReservationUser()
        // this.vehicleUser.id=this.user.
      })
    });
  }
}
