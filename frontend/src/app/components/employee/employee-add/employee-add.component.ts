import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';
import { Employee } from 'src/app/models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  employee: Employee;
  btnDisable = false;
  url = 'http://localhost:3000/v1/api/accounts';
  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router
  ) {
    this.employee = new Employee();
  }

  ngOnInit() {}

  validate() {
    console.log(this.employee);
    return true;
  }
  async save() {
    this.btnDisable = true;

    if (this.validate()) {
      try {
        await this.rest.post(this.url, this.employee);
        this.data.success('success');
        this.btnDisable = false;
        this.router.navigate(['employee/list']);
      } catch (error) {
        this.data.error('error');
        this.btnDisable = false;
      }
    }
  }
}
