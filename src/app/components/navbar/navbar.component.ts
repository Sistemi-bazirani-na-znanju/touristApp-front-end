import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../infrastructure/auth';
import { Router } from '@angular/router';
import { User } from '../../infrastructure/auth/model/user.model';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
@Component({
  selector: 'pd-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
 
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  isProfilePage(): boolean {
    return this.router.url === '/profile';
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
       this.user = user;
       console.log(this.user)
    });
  }

  onLogout(): void {
    this.authService.logout();
  } 
}
