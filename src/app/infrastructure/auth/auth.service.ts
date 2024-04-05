import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './jwt/token.service';
import { environment } from '../../../env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './model/login.model';
import { AuthenticationResponse } from './model/authentication-response.model';
import { User } from './model/user.model';
import { Registration } from './model/registration.model';
import { RegisteredUserService } from '../rest/registered-user.service';
import { RegisteredUser } from './model/registered-user.model';
import { CookieService } from 'ngx-cookie-service';
import { ChangePassword } from './model/change-password.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private access_token: string | null = null; 
  private password_changed: string | null = null;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  });

  userEmail: String = "";
  
  use: RegisteredUser | undefined;

  user$ = new BehaviorSubject<any>({
    id: 0,
    email: '',
    roles: []
  });

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
    
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router,
    private regUsService: RegisteredUserService,
    private cookieService: CookieService
  ) {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      this.access_token = storedToken;
      this.setUser();
    }
  }

  setAuthenticationStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
  
  isAuthenticatedSrc: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookieService.get('LoggedIn') === 'true');

  get isAuthenticated(): Observable<boolean> {
  return this.isAuthenticatedSrc.asObservable();
  }

  getAccessToken() {
    return this.access_token;
  }

  setAccessToken(token: string) {
    this.access_token = token;
  }

  login(login: Login) : Observable<AuthenticationResponse> {
    // this.isAuthenticated$ = false;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://localhost:8080/auth/login', login, { headers })
      .pipe(map((res) => {
        console.log(res);
        this.access_token = res.accessToken;
        //AKO VAM TREBA ID ILI EMAIL ULOGOVANOG USERA
        // const tokenPayload = JSON.parse(atob(res.accessToken.split('.')[1]));
        // const email = tokenPayload.sub;
        // const id = tokenPayload.id;
        // console.log('Email:', email);
        // console.log('ID:', id);
        localStorage.setItem("jwt", res.accessToken);
        this.setUser();
        this.findRegisteredUserById().subscribe({
          next: (result) => {
            this.use=result;
            console.log('User that has been registered:', this.use);
            window.location.reload();
          },
          error: (err: any) => {
            console.log(err);
            window.location.reload();
          }
        });
        this.router.navigate(['/']);
        return res;
      }));
  }

  changePassword(changePassword: ChangePassword, logout: boolean = true) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://localhost:8080/auth/change-password', changePassword, { headers })
      .pipe(map((res) => {
        console.log(res);

        if (res && res.success && logout) {
          // Assuming you have a method named logout to handle the logout functionality
          this.logout();
        }

        return res;
      }));
  }

  register(registration: Registration): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'registration', registration)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          console.log(authenticationResponse.accessToken)
        })
      );
  }
  
  activateRegistratedUser(id: number): void {
    console.log("Sad treba da se aktivira " + id);
    
    this.http
      .put<AuthenticationResponse>(environment.apiHost + 'registration/activate/' + id, {})
      .subscribe({
        next: (authenticationResponse) => {
          console.log("USER AKTIVIRAN");
          // Handle the response or perform any other actions here
        },
        error: (error) => {
          console.error("Error activating user:", error);
          // Handle the error if needed
        }
      });
  }

  logout(): void {
    this.router.navigate(['/']).then(_ => {
      localStorage.removeItem("jwt");
      this.access_token = null;
      this.user$.next({email: "", id: 0,roles: []});
      window.location.reload();
      }
    );
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.access_token || "";
    const user: any = {
      id: +jwtHelperService.decodeToken(accessToken).id,
      email: jwtHelperService.decodeToken(accessToken).sub,
      roles: jwtHelperService.decodeToken(accessToken).roles,
    };
    console.log(user)
    this.user$.next(user);
  }

  getUserById(): Observable<User> {
    const userId= this.user$.value.id;
    return this.http.get<User>(`${environment.apiHost}users/${userId}`);
  }

  findRegisteredUserById():Observable<RegisteredUser>{
    return this.http.get<RegisteredUser>(`${environment.apiHost}registered-users/by-id/${this.user$.value.id}`, { headers: this.headers });
  }

  tokenIsPresent() {
    console.log("Token is present" + this.access_token != undefined && this.access_token != null)
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }
}
