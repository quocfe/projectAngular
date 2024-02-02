import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  NavigationEnd,
} from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { RestApiService } from './../rest-api/rest-api.service';
import { Api } from 'src/app/constant/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  message = '';
  messageType = 'danger';
  isLogined: boolean = false;
  isAdmin: boolean = false;
  isStatus!: string;

  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  async getProfile() {
    const token = localStorage.getItem('token');
    const employeeID = localStorage.getItem('employeeId');
    if (!token || !employeeID) {
      this.router.navigate(['/auth/login']);
    }
    const response = await this.rest.getOne(Api.EMPLOYEE, employeeID);
    let value = response as { employee: Employee };
    this.isStatus = value.employee.status;
    value.employee.role === 'Leader'
      ? (this.isAdmin = true)
      : (this.isAdmin = false);

    token === null ? (this.isLogined = false) : (this.isLogined = true);
  }

  checkIsAdmin() {
    return this.isAdmin;
  }

  checkIsStatus() {
    return this.isStatus;
  }

  error(message: string) {
    (this.messageType = 'danger'), (this.message = message);
  }

  success(message: string) {
    (this.messageType = 'success'), (this.message = message);
  }

  warning(message: string) {
    (this.messageType = 'warning'), (this.message = message);
  }
}
