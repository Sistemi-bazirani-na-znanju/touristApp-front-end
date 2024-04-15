import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../env/environment';
import { RegisteredUser } from './model/registered-user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService {
  basePath: string;
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem("jwt")}`})

  constructor(private http: HttpClient) {
    this.basePath = environment.apiHost;
  }

  getById(id: number): Observable<RegisteredUser> {
    console.log(localStorage.getItem("jwt"));
    const path = this.basePath + "users/" + id;
    return this.http.get<RegisteredUser>(path, {headers: this.headers});
  }

}
