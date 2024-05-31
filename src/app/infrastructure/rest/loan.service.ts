import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import { Loan } from './model/loan.model';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
    basePath: string;
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    constructor(private http: HttpClient) {
      this.basePath = 'http://localhost:8081/api/';
  }


    getAll(): Observable<Loan[]> {
        const path = this.basePath + 'loans'  ;
        let result = this.http.get<Loan[]>(path, { headers: this.headers });
        return result;
    }

    getById(id: number): Observable<any> {
        const path = this.basePath + 'loans/' + id;
        let result = this.http.get<any>(path, { headers: this.headers });
        return result;
    }

    create(Loan: Loan): Observable<Loan> {
        const path = this.basePath + 'loans';
        return this.http.post<Loan>(path, Loan, { headers: this.headers });
    }

    getAllUserLoans(userId : number): Observable<Loan[]> {
        const path = this.basePath + 'loans/user/' + userId ;
        let result = this.http.get<Loan[]>(path, { headers: this.headers });
        return result;
    }
}
