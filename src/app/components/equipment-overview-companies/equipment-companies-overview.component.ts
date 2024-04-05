import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../infrastructure/rest/company.service';
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
import { Company } from '../../company/model/company.model';
import { PagedResult } from '../../infrastructure/rest/model/paged-result.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pd-equipment-companies-overview',
  templateUrl: './equipment-companies-overview.component.html',
  styleUrl: './equipment-companies-overview.component.css'
})
export class EquipmentCompaniesOverviewComponent {
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
  searchFilter: {name: string, country: string, city: string, minRating: number, maxRating: number, sortCriteria: string, page: number, pageSize: number}
  displayedSortCriteria: string;
  SortIcons: { [key: string]: any } = {};
  displayedSortIcon: any;
  companies: Company[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  pages: any[] = [];
  equipmentId: number | null = null;

  constructor(private companyService: CompanyService, private route: ActivatedRoute) {
    this.searchFilter = {name: "", country: "", city: "", minRating: 0, maxRating: 5, sortCriteria: "", page: this.currentPage, pageSize: this.pageSize}
    this.displayedSortCriteria = '-';
  }

  ngOnInit(): void {
    this.dropped = {nameDropped: true, locationDropped: true, ratingDropped: true}
    this.SortIcons = {ascending: faArrowUpWideShort, descending: faArrowDownWideShort, none: ""};
    this.displayedSortIcon = "";

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.equipmentId = id ? parseInt(id, 10) : null;
      if (this.equipmentId !== null) {
        this.search(); 
      }
    });
  }

  toggle(name: string) {
    this.dropped[name] = !this.dropped[name]
  }

  search(): void {
    this.searchFilter.page = this.currentPage;
    this.companyService.findAllByEquipmentId(this.searchFilter, this.equipmentId).subscribe({
      next: (result: PagedResult<CompanyNoAdmin>) => {
        this.companies = result.results;
        this.totalCount = result.totalCount;
        this.setPages();
        console.log(result);
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
}
