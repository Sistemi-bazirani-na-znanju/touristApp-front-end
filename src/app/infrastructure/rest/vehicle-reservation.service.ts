import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { Observable } from 'rxjs';
import { VehicleReservation } from './model/vehicle-reservation.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleReservationService {

    basePath: string;
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    constructor(private http: HttpClient) {
        this.basePath = 'http://localhost:8081/api/';
    }

    getUserReservations(userId : number) : Observable<VehicleReservation[]>{
      const path = this.basePath + 'vehicle-reservation/user/' + userId ;
      return this.http.get<VehicleReservation[]>(path,{headers: this.headers});
    }


  
}
