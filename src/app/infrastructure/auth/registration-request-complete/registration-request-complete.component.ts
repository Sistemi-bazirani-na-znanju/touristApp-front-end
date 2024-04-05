import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'pd-registration-request-complete',
  templateUrl: './registration-request-complete.component.html',
  styleUrls: ['./registration-request-complete.component.css']
})
export class RegistrationRequestCompleteComponent implements OnInit {

  private id!: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit() {
    
    this.route.params.subscribe(params => {
    console.log("INITTT");
    this.id = +params['id']; 
    this.authService.activateRegistratedUser(this.id);
    });
  }

  logIn() {
    this.router.navigate(['login']);
  }
}
