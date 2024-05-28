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

    create(vehicleReservation: VehicleReservation): Observable<VehicleReservation> {
      const path = this.basePath + 'vehicle-reservation/save/';
      return this.http.post<VehicleReservation>(path, vehicleReservation, { headers: this.headers });
  }
    cancelReservation(reservationId : number, reason : string) : Observable<VehicleReservation>{
      const path = this.basePath + 'vehicle-reservation/cancel/' + reservationId ;
      return this.http.put<VehicleReservation>(path, reason, {headers: this.headers});
    }
    
    returnVehicle(reservationId : number, vehicleState : string) : Observable<VehicleReservation>{
      const path = this.basePath + 'vehicle-reservation/return/' + reservationId ;
      return this.http.put<VehicleReservation>(path, vehicleState, {headers: this.headers});
    }

    pickupVehicle(reservationId : number) : Observable<VehicleReservation>{
      const path = this.basePath + 'vehicle-reservation/pickup/' + reservationId;
      return this.http.put<VehicleReservation>(path, {headers: this.headers});
    }


  
}
