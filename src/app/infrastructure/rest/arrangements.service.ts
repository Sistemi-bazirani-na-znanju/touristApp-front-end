import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import { Arrangement } from './model/arrangement.model';

@Injectable({
  providedIn: 'root',
})
export class ArrangementService {
    basePath: string;
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    constructor(private http: HttpClient) {
        this.basePath = environment.apiHost;
    }


    getAll(): Observable<Arrangement[]> {
        const path = this.basePath + 'arrangements';
        let result = this.http.get<Arrangement[]>(path, { headers: this.headers });
        return result;
    }

  getById(id: number): Observable<any> {
    const path = this.basePath + 'arrangements/' + id;
    let result = this.http.get<any>(path, { headers: this.headers });
    return result;
  }

    update(id: number, arrangement: any): Observable<Arrangement> {
        const path = this.basePath + 'arrangements/' + id;
        console.log(path);
        return this.http.put<Arrangement>(path, arrangement, { headers: this.headers });
    }

    create(arrangement: Arrangement): Observable<Arrangement> {
        const path = this.basePath + 'arrangements';
        return this.http.post<Arrangement>(path, arrangement, { headers: this.headers });
    }
}
