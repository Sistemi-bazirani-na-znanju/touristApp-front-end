import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../env/environment";
import { ReservationCreation } from "./model/reservation-creation.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class ReservationService {
      basePath: string;
      headers: HttpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      });
  
      constructor(private http: HttpClient) {
          this.basePath = environment.apiHost;
      }
  
      create(reservation: ReservationCreation): Observable<ReservationCreation> {
          const path = this.basePath + 'reservations';
          return this.http.post<ReservationCreation>(path, reservation, { headers: this.headers });

          
      }

      getAllReservations(): Observable<ReservationCreation[]> {
        const path = this.basePath + 'reservations';
        let result = this.http.get<ReservationCreation[]>(path, { headers: this.headers });
        return result;
    }
  }
  