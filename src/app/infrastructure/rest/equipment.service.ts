import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../env/environment';
import { PagedResult } from './model/paged-result.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  basePath: string;

  constructor(private http: HttpClient) {
    this.basePath = environment.apiHost;
  }
}
