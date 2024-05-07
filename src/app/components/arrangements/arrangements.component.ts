import { Component } from '@angular/core';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { ArrangementService } from '../../infrastructure/rest/arrangements.service';
import { Arrangement, ArrangementType } from '../../infrastructure/rest/model/arrangement.model';

@Component({
  selector: 'pd-arrangements',
  templateUrl: './arrangements.component.html',
  styleUrl: './arrangements.component.css'
})
export class ArrangementComponent {
  userId: number = -1;
  user: RegisteredUser = new RegisteredUser();
  canEdit: boolean = false;
  arrangements: Arrangement[] = [];
  displayedArrangements: Arrangement[] = [];
  selectedSortingOption: String = "";


  constructor(public arrangementService: ArrangementService,
              private authService: AuthService,
              private userService: RegisteredUserService,
              private route: ActivatedRoute,
              private router: Router,){
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchUser();
      this.getArrangements(this.userId);
    })
  }
  
  getArrangements(userId: number) {
    this.arrangementService.getAll(this.authService.user$.getValue().id).subscribe({
        next: (arrangements: Arrangement[]) => {
            this.displayedArrangements = arrangements; 
            this.sortArrangements();
            console.log("Arrangements retrieved successfully");
            console.log(this.displayedArrangements); 
        },
        error: (errData) => {
            console.log("Error: " + errData);
        }
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


  sortArrangements() {

  }

  filterArrangements() {
    this.sortArrangements();
  }

  getArrangementTypeName(type: ArrangementType): string {
    switch(type) {
      case ArrangementType.INDIVIDUAL:
        return "Individual";
      case ArrangementType.FAMILY:
        return "Family";
      case ArrangementType.GROUP:
        return "Group";
      default:
        return "Unknown";
    }
  }

  routeToArrangementRating(arrangementId: number) {
    console.log("Navigating to arrangement rating");
    this.router.navigate(['arrangement-rating', arrangementId]);
  }

  formatDate(date: Date): string {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = (parsedDate.getFullYear() + 1900).toString(); 
    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  
  
  
}
