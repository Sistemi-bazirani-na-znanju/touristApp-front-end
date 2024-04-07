import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'pd-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

  userId: number = -1;
  user?: User;

  constructor(
    private router: Router,
    private authService : AuthService,
  ){}

  ngOnInit() : void{
    this.fetchUser();
  }

  goToHomePage() {
    this.router.navigate(['home']);
  }

  fetchUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;

    });

  }

}
