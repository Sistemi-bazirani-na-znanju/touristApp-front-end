import { Component, Input } from '@angular/core';
import { Company } from '../../../company/model/company.model';
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

@Component({
  selector: 'pd-unregistered-user-company-card',
  templateUrl: './unregistered-user-company-card.component.html',
  styleUrl: './unregistered-user-company-card.component.css'
})
export class UnregisteredUserCompanyCardComponent {
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
