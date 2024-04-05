import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorage } from '../infrastructure/auth/jwt/token.service';
import { Router } from '@angular/router';
import { Equipment } from '../infrastructure/rest/model/equipment.model';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { EquipmentRequest } from '../infrastructure/rest/model/equipment-request.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  });

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router,
  ) {}

  addNewEquipment(equipment: EquipmentRequest): Observable<Equipment> {
    const route = environment.apiHost + 'equipment';
    return this.http.post<Equipment>(route, equipment, {headers: this.headers});
  }

  getById(id: number): Observable<Equipment> {
    const route = environment.apiHost + 'equipment/' + id;
    return this.http.get<Equipment>(route, {headers: this.headers});
  }
  
  updateEquipment(id: number, equipment: Equipment): Observable<Equipment> {
    const route = environment.apiHost + 'equipment/' + id;
    return this.http.put<Equipment>(route, equipment, {headers: this.headers});
  }
}
