import { Component, OnInit } from '@angular/core';
import { Loan } from '../../infrastructure/rest/model/loan.model';
import { LoanService } from '../../infrastructure/rest/loan.service';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-loans',
  templateUrl: './user-loans.component.html',
  styleUrls: ['./user-loans.component.css']
})
export class UserLoansComponent implements OnInit {
  userLoans: Loan[] = [];
  user: any;
  userId: any;

  constructor(private loanService: LoanService,private authService: AuthService,private userService: RegisteredUserService,private router: Router) {}
  

  ngOnInit(): void {
    this.getUserId();
  }

  getUserLoans(): void {
    this.loanService.getAllUserLoans(this.userId).subscribe(
      (loans: Loan[]) => {
        this.userLoans = loans;
      },
      error => {
        console.error('Error fetching user loans:', error);
      }
    );
  }

  getUserId() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;
      this.userService.getById(this.userId).subscribe(registeredUser => {
         this.user = registeredUser;
        // this.vehicleUser = new VehicleReservationUser()
        // this.vehicleUser.id=this.user.
        this.getUserLoans();
      })
    });
  }
}
