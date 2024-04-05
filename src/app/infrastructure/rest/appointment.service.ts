import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../auth/jwt/token.service';
import { Router } from '@angular/router';
import { environment } from '../../../env/environment';
import { Appointment } from './model/appointmen.model';
import { Observable } from 'rxjs';
import { AppointmentRequest } from './model/appointment-request.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  basePath: string;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  });

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {
    this.basePath = environment.apiHost;
  }

  createAppointment(appointmentRequest: AppointmentRequest): Observable<any> {
    const path = this.basePath + 'appointments/new';
    console.log(path);
    return this.http.post<any>(path, appointmentRequest, {
      headers: this.headers,
    });
  }

  cancleAppointment(appointment: Appointment): Observable<any> {
    const path = this.basePath + 'appointments/cancle/' + appointment.id;
    console.log(path);
    return this.http.patch<any>(path, {}, { headers: this.headers });
  }

  getAppointmentsByCompanyId(companyId: number): Observable<Appointment[]> {
    const path = this.basePath + 'appointments/by-company-id/' + companyId;
    return this.http.get<Appointment[]>(path, { headers: this.headers });
  }

  getNotFreeAppointmentsByCompanyId(
    companyId: number
  ): Observable<Appointment[]> {
    const path =
      this.basePath + 'appointments/by-company-id-not-free/' + companyId;
    return this.http.get<Appointment[]>(path, { headers: this.headers });
  }
}
