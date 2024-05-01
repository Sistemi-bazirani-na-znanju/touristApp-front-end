import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import { Arrangement } from './model/arrangement.model';
import { Vehicle } from './model/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  basePath: string;
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    constructor(private http: HttpClient) {
      this.basePath = 'http://localhost:8081/api/';
  }

  getAll(): Observable<Vehicle[]> {
    const path = this.basePath + 'vehicles';
    let result = this.http.get<Vehicle[]>(path, { headers: this.headers });
    return result;
}
}