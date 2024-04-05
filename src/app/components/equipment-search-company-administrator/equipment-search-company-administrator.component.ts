import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../infrastructure/rest/company.service';
import { Route } from '@angular/router';
import { 
  faFilter,
  faXmark, 
  faChevronDown,
  faArrowUpWideShort,
  faArrowDownWideShort,
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faStar,
  faClock
 } from "@fortawesome/free-solid-svg-icons";
import { CompanyNoAdmin } from '../../infrastructure/rest/model/company-no-admin.model';
import { PagedResult } from '../../infrastructure/rest/model/paged-result.model';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { EquipmentSearchService } from '../../infrastructure/rest/equipment-search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pd-equipment-search-company-administrator',
  templateUrl: './equipment-search-company-administrator.component.html',
  styleUrl: './equipment-search-company-administrator.component.css'
})
export class EquipmentSearchCompanyAdministratorComponent {
  faFilter = faFilter;
  faXmark = faXmark;
  faChevronDown = faChevronDown;
  faArrowUpWideShort = faArrowUpWideShort;
  faArrowDownWideShort = faArrowDownWideShort;
  faChevronLeft= faChevronLeft;
  faChevronRight = faChevronRight;
  faLocationDot = faLocationDot;
  faStar = faStar;
  faClock = faClock; 
  dropped: { [key: string]: boolean } = {};
  searchFilter: {name: string, description: string, type: string, minRating: number, maxRating: number, sortCriteria: string, page: number, pageSize: number}
  displayedSortCriteria: string;
  SortIcons: { [key: string]: any } = {};
  displayedSortIcon: any;
  equipment: Equipment[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  pages: any[] = [];

  constructor(private equipmentSearchService: EquipmentSearchService) {
    this.searchFilter = {name: "", description: "", type: "", minRating: 0, maxRating: 5, sortCriteria: "", page: this.currentPage, pageSize: this.pageSize}
    this.displayedSortCriteria = '-';
  }

  ngOnInit(): void {
    this.dropped = {nameDropped: true, descriptionDropped: true, typeDropped: true, ratingDropped: true}
    this.SortIcons = {ascending: faArrowUpWideShort, descending: faArrowDownWideShort, none: ""};
    this.displayedSortIcon = "";
    this.search();
  }

  toggle(name: string) {
    this.dropped[name] = !this.dropped[name]
  }

  changeSortCriteria(criteria: string, displayedCriteria: string, displyaedIcon: string) {
    this.searchFilter.sortCriteria = criteria;
    this.displayedSortCriteria = displayedCriteria;
    this.displayedSortIcon = this.SortIcons[displyaedIcon];
    this.currentPage = 1;
    this.search();
  }

  validateMinRating() {
    if(this.searchFilter.minRating >= this.searchFilter.maxRating) {
      this.searchFilter.maxRating = Number((this.searchFilter.minRating + 0.1).toFixed(1));
    }
  }

  validateMaxRating() {
    if(this.searchFilter.maxRating <= this.searchFilter.minRating) {
      this.searchFilter.minRating = Number((this.searchFilter.maxRating - 0.1).toFixed(1));
    }
  }

  countFilters(): number {
    let number = 0;
    if(this.searchFilter.name !== '') number++
    if(this.searchFilter.description !== '') number++
    if(this.searchFilter.type !== '') number++
    if(this.searchFilter.minRating > 0) number++
    if(this.searchFilter.maxRating < 5) number++
    return number
  }

  search(): void {
    this.searchFilter.page = this.currentPage;
    this.equipmentSearchService.searchCompanyAdministrator(this.searchFilter).subscribe({
      next: (result: PagedResult<Equipment>) => {
        this.equipment = result.results;
        this.totalCount = result.totalCount;
        this.setPages();
      },
      error: (errData) => {
        console.log(errData);
      }
    })
  }

  setPages(): void {
    this.pages = [];
    const pageNumber = Math.ceil(this.totalCount / this.pageSize);
    if(this.currentPage > 1) this.pages.push("<");
    if(this.currentPage > 3) this.pages.push(1);
    if(this.currentPage > 4) this.pages.push("...");
    if(this.currentPage > 2) this.pages.push(this.currentPage - 2);
    if(this.currentPage > 1) this.pages.push(this.currentPage - 1);
    this.pages.push(this.currentPage);
    if(pageNumber - this.currentPage > 0) this.pages.push(this.currentPage + 1);
    if(pageNumber - this.currentPage > 1) this.pages.push(this.currentPage + 2);
    if(pageNumber - this.currentPage > 3) this.pages.push("...");
    if(pageNumber - this.currentPage > 2) this.pages.push(pageNumber);
    if(pageNumber - this.currentPage > 0) this.pages.push(">");
  }
  
  switchPage(command: any): void {
    if(command === "..." || command === this.currentPage) return;
    if(command === "<") this.currentPage--;
    if(command === ">") this.currentPage++;
    if(typeof command === 'number') this.currentPage = command;
    this.search();
  } 

  // navigateToCompaniesOverview(id: number) {
  //   this.router.navigate(['/equipment-companies-overview', id]);
  // }
}
