import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
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
  faClock,
  faBoxOpen,
  faFlask
 } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'pd-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrl: './equipment-card.component.css'
})
export class EquipmentCardComponent {
  
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
  faBoxOpen = faBoxOpen;
  faFlask = faFlask;

  @Input() equipment!: Equipment;
  @Input() selected: boolean = false;

  ngOnInit(): void {
    this.equipment.quantity = 1;
  }

  childClick(event: Event) {
    event.stopPropagation();
  }
}
