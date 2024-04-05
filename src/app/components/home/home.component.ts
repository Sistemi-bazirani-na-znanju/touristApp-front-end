import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../infrastructure/auth';
import { User } from '../../infrastructure/auth/model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'pd-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userId: number = -1;
  user?: User;


  constructor(private authService: AuthService,
              private dialogRef: MatDialog) { }

  isAuthenticated$ = this.authService.isAuthenticated$;

  ngOnInit(): void {
    // this.isAuthenticated$.subscribe((isAuthenticated) => {
    //   window.location.reload();
    // });
    

    this.fetchUser();
  }

  fetchUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;

    });
  }  

}
