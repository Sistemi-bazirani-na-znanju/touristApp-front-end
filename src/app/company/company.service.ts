import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistrationCompany } from './model/registration-company.model';
import { environment } from '../../env/environment';
import { AuthenticationResponse } from '../infrastructure/auth/model/authentication-response.model';
import { TokenStorage } from '../infrastructure/auth/jwt/token.service';
import { Company } from './model/company.model';
import { Equipment } from '../infrastructure/rest/model/equipment.model';
import { CompanyAdministrator } from '../infrastructure/auth/model/company-administrator.model';
import { CompanyEquipment } from '../infrastructure/rest/model/company-equipment.model';
import { AddEquipment } from '../infrastructure/rest/model/add-equipment.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  });

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {}

  registerCompany(company: Company): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(
        environment.apiHost + 'companies/register',
        company,
        { headers: this.headers }
      )
      .pipe(
        tap((authenticationResponse) => {
          console.log('AUTHENTICATED COMPANY');
        })
      );
  }

  getById(id: number): Observable<Company> {
    const route = environment.apiHost + 'companies/' + id;
    return this.http.get<Company>(route, { headers: this.headers });
  }

  getEquipmentByCompanyId(id: number): Observable<Equipment[]> {
    const route = environment.apiHost + 'companies/' + id + '/equipment';
    return this.http.get<Equipment[]>(route, { headers: this.headers });
  }

  registerCompanyAdministrator(
    companyId: number | null,
    companyAdministrator: CompanyAdministrator
  ): Observable<AuthenticationResponse> {
    if (companyId == null) {
      companyId = 0;
    }

    return this.http
      .post<AuthenticationResponse>(
        environment.apiHost + 'companies/admin/' + companyId,
        companyAdministrator,
        { headers: this.headers }
      )
      .pipe(
        tap((authenticationResponse) => {
          console.log('AUTHENTICATED COMPANY ADMINISTRATOR');
        })
      );
  }

  update(companyId: number, updatedCompany: Company): Observable<Company> {
    const route = environment.apiHost + 'companies/update/' + companyId;
    console.log(route, { headers: this.headers });
    return this.http.put<Company>(route, updatedCompany, {
      headers: this.headers,
    });
  }

  getCompanyEquipmentByCompanyId(id: number): Observable<any> {
    const route = environment.apiHost + 'companies/' + id + '/equipment';
    console.log()
    return this.http.get<any>(route, { headers: this.headers });
  }

  getNotAddedCompanyEquipmentByCompanyId(
    id: number
  ): Observable<CompanyEquipment[]> {
    const route =
      environment.apiHost + 'equipment/' + 'not-owned-by-company/' + id;
    return this.http.get<CompanyEquipment[]>(route, { headers: this.headers });
  }

  addEquimpentToCompany(cId: number, eId: number): Observable<AddEquipment> {
    const route = environment.apiHost + 'companies/add-equipment';
    console.log(cId, eId);
    let dto: AddEquipment = {
      companyId: cId,
      equipmentId: eId,
    };
    return this.http.put<AddEquipment>(route, dto, { headers: this.headers });
  }

  removeEquimpentFromCompany(cId: number, eId: number): Observable<any> {
    const route = environment.apiHost + 'equipment/delete/' + eId;
    return this.http.delete<any>(route, { headers: this.headers });
  }
}
