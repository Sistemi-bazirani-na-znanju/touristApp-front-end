import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import { CompanyNoAdmin } from './model/company-no-admin.model';
import { PagedResult } from './model/paged-result.model';
import { Company } from '../../company/model/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  basePath: string;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  });
  constructor(private http: HttpClient) {
    this.basePath = environment.apiHost;
  }

  search(searchFilter: any): Observable<PagedResult<CompanyNoAdmin>> {
    const nameQuery =
      searchFilter.name != '' ? `name=${searchFilter.name}` : '';
    const countryQuery =
      searchFilter.country != '' ? `country=${searchFilter.country}` : '';
    const cityQuery =
      searchFilter.city != '' ? `city=${searchFilter.city}` : '';
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
    if (countryQuery != '')
      query = query != '' ? `${query}&${countryQuery}` : countryQuery;
    if (cityQuery != '')
      query = query != '' ? `${query}&${cityQuery}` : cityQuery;
    if (minRatingQuery != '')
      query = query != '' ? `${query}&${minRatingQuery}` : minRatingQuery;
    if (maxRatingQuery != '')
      query = query != '' ? `${query}&${maxRatingQuery}` : maxRatingQuery;
    if (sortCriteriaQuery != '')
      query = query != '' ? `${query}&${sortCriteriaQuery}` : sortCriteriaQuery;
    query = query != '' ? `${query}&` : query;
    query = `${query}${pageQuery}&${pageSizeQuery}`;
    const path = this.basePath + 'companies/search?' + query;
    return this.http.get<PagedResult<CompanyNoAdmin>>(path);
  }

  findAllByEquipmentId(
    searchFilter: any,
    equipmentId: number | null
  ): Observable<PagedResult<CompanyNoAdmin>> {
    if (equipmentId == null) {
      equipmentId = 0;
    }

    const nameQuery =
      searchFilter.name != '' ? `name=${searchFilter.name}` : '';
    const countryQuery =
      searchFilter.country != '' ? `country=${searchFilter.country}` : '';
    const cityQuery =
      searchFilter.city != '' ? `city=${searchFilter.city}` : '';
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
    if (countryQuery != '')
      query = query != '' ? `${query}&${countryQuery}` : countryQuery;
    if (cityQuery != '')
      query = query != '' ? `${query}&${cityQuery}` : cityQuery;
    if (minRatingQuery != '')
      query = query != '' ? `${query}&${minRatingQuery}` : minRatingQuery;
    if (maxRatingQuery != '')
      query = query != '' ? `${query}&${maxRatingQuery}` : maxRatingQuery;
    if (sortCriteriaQuery != '')
      query = query != '' ? `${query}&${sortCriteriaQuery}` : sortCriteriaQuery;
    query = query != '' ? `${query}&` : query;
    query = `${query}${pageQuery}&${pageSizeQuery}`;
    const path =
      this.basePath + 'companies/by-equipment/' + equipmentId + '?' + query;
    return this.http.get<PagedResult<CompanyNoAdmin>>(path, {headers: this.headers});
  }
}
