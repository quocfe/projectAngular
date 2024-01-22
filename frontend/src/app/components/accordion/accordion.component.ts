import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit {
  reportsOpen = false;
  @Input() zone!: string;
  @Input() employees!: string[];

  constructor() {}

  toggleReports() {
    this.reportsOpen = !this.reportsOpen;
  }

  ngOnInit() {}
}
