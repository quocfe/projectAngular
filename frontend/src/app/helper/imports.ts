import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgbAccordionModule,
  NgbCollapse,
  NgbCollapseModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';

export const imports = [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  AppRoutingModule,
  NgbModule,
  NgbCollapseModule,
  NgbAccordionModule,
  NgbCollapse,
];
