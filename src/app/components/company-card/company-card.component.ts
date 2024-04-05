import { Component, OnInit, Input } from '@angular/core';
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
import { Company } from '../../company/model/company.model';

@Component({
  selector: 'pd-company-card',
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.css'
})
export class CompanyCardComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void { }

  @Input() company!: Company;
  @Input() imageURL!: string;
}
