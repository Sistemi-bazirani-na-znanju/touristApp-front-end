import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import { Equipment } from './model/equipment.model';
import { PagedResult } from './model/paged-result.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentSearchService {
  basePath: string;
  headers: HttpHeaders = new HttpHeaders({
    'COntent-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  });
  constructor(private http: HttpClient) {
    this.basePath = environment.apiHost;
  }

  search(searchFilter: any): Observable<PagedResult<Equipment>> {
    const nameQuery =
      searchFilter.name != '' ? `name=${searchFilter.name}` : '';
    const descriptionQuery =
      searchFilter.description != ''
        ? `description=${searchFilter.description}`
        : '';
    const typeQuery =
      searchFilter.type != '' ? `type=${searchFilter.type}` : '';
    const minRatingQuery =
      searchFilter.minRating != 0 ? `minRating=${searchFilter.minRating}` : '';
    const maxRatingQuery =
      searchFilter.maxRating != 5 ? `maxRating=${searchFilter.maxRating}` : '';
    const sortCriteriaQuery =
      searchFilter.sortCriteria != ''
        ? `sortCriteria=${searchFilter.sortCriteria}`
        : '';
    const pageQuery = `page=${searchFilter.page}`;
    const pageSizeQuery = `pageSize=${searchFilter.pageSize}`;
    let query = nameQuery;
    if (descriptionQuery != '')
      query = query != '' ? `${query}&${descriptionQuery}` : descriptionQuery;
    if (typeQuery != '')
      query = query != '' ? `${query}&${typeQuery}` : typeQuery;
    if (minRatingQuery != '')
      query = query != '' ? `${query}&${minRatingQuery}` : minRatingQuery;
    if (maxRatingQuery != '')
      query = query != '' ? `${query}&${maxRatingQuery}` : maxRatingQuery;
    if (sortCriteriaQuery != '')
      query = query != '' ? `${query}&${sortCriteriaQuery}` : sortCriteriaQuery;
    query = query != '' ? `${query}&` : query;
    query = `${query}${pageQuery}&${pageSizeQuery}`;
    const path = this.basePath + 'equipment/search?' + query;
    return this.http.get<PagedResult<Equipment>>(path);
  }

  searchCompanyAdministrator(
    searchFilter: any
  ): Observable<PagedResult<Equipment>> {
    const nameQuery =
      searchFilter.name != '' ? `name=${searchFilter.name}` : '';
    const descriptionQuery =
      searchFilter.description != ''
        ? `description=${searchFilter.description}`
        : '';
    const typeQuery =
      searchFilter.type != '' ? `type=${searchFilter.type}` : '';
    const minRatingQuery =
      searchFilter.minRating != 0 ? `minRating=${searchFilter.minRating}` : '';
    const maxRatingQuery =
      searchFilter.maxRating != 5 ? `maxRating=${searchFilter.maxRating}` : '';
    const sortCriteriaQuery =
      searchFilter.sortCriteria != ''
        ? `sortCriteria=${searchFilter.sortCriteria}`
        : '';
    const pageQuery = `page=${searchFilter.page}`;
    const pageSizeQuery = `pageSize=${searchFilter.pageSize}`;
    let query = nameQuery;
    if (descriptionQuery != '')
      query = query != '' ? `${query}&${descriptionQuery}` : descriptionQuery;
    if (typeQuery != '')
      query = query != '' ? `${query}&${typeQuery}` : typeQuery;
    if (minRatingQuery != '')
      query = query != '' ? `${query}&${minRatingQuery}` : minRatingQuery;
    if (maxRatingQuery != '')
      query = query != '' ? `${query}&${maxRatingQuery}` : maxRatingQuery;
    if (sortCriteriaQuery != '')
      query = query != '' ? `${query}&${sortCriteriaQuery}` : sortCriteriaQuery;
    query = query != '' ? `${query}&` : query;
    query = `${query}${pageQuery}&${pageSizeQuery}`;
    const path =
      this.basePath + 'equipment/search?' + query;
    return this.http.get<PagedResult<Equipment>>(path, {
      headers: this.headers,
    });
  }
}
