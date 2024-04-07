import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../infrastructure/auth';
import { Router } from '@angular/router';
import { Role, User, createEmptyUser } from '../../infrastructure/auth/model/user.model';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
@Component({
  selector: 'pd-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
 
  user: User = createEmptyUser();

  constructor(private authService: AuthService, private router: Router) {}

  isProfilePage(): boolean {
    return this.router.url === '/profile';
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
       this.user = user;
    });
  }

  onLogout(): void {
    this.authService.logout();
  } 

  hasRole(role: Role, roleName: string): boolean {
    return role.name === roleName;
  }
}
