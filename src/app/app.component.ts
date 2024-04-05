import { Component, Input, SimpleChanges } from '@angular/core';
import { AuthService } from './infrastructure/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CookieService]
})
export class AppComponent {
  title = 'pharmacy-delivery-fe';
  
  @Input() cookie : string = this.cookieService.get('LoggedIn');

  constructor(
    private authService: AuthService,
    public cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.checkIfUserExists();
  }
  ngOnChanges( changes : SimpleChanges) {
    const { currentValue }  = changes['cookie'];
  }
  private checkIfUserExists(): void {
    this.authService.checkIfUserExists();
  }
}
