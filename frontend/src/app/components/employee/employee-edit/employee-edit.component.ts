import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  employee!: Employee;
  btnDisable = false;
  id: string;
  url = `http://localhost:3000/v1/api/accounts`;
  constructor(
    private rest: RestApiService,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = route.snapshot.params['id'];
  }

  async ngOnInit() {
    this.btnDisable = true;
    try {
      const data = await this.rest.getOne(this.url, this.id);
      this.employee = (data as { employee: Employee }).employee;
    } catch (error) {
      console.log(error);
      this.btnDisable = false;
    }
  }
  validate() {
    return true;
  }

  async update() {
    this.btnDisable = true;
    if (this.validate()) {
      try {
        await this.rest.put(this.url, this.id, this.employee);
        this.data.success('success');
        this.btnDisable = false;
        this.router.navigate(['/employee/list']);
      } catch (error) {
        this.data.error('error');
        this.btnDisable = false;
      }
    }
  }

  back() {
    this.router.navigate(['employee/list']);
  }
}
