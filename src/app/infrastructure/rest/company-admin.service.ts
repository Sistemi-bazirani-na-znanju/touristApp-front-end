import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import { CompanyAdmin } from './model/company-admin.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyAdminService {
  basePath: string;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  });

  constructor(private http: HttpClient) {
    this.basePath = environment.apiHost;
  }

  getById(id: number): Observable<CompanyAdmin> {
    const path = this.basePath + 'company-administrators/' + id;
    let result = this.http.get<CompanyAdmin>(path, { headers: this.headers });
    return result;
  }

  update(id: number, updatedUser: any): Observable<CompanyAdmin> {
    const path = this.basePath + 'company-administrators/' + id;
    console.log(path);
    return this.http.put<CompanyAdmin>(path, updatedUser, { headers: this.headers });
  }
}
