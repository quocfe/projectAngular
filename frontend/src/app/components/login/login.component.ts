import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { Token } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  employee!: Employee;
  btnDisable = false;
  employeeId!: String;
  url = 'http://localhost:3000/v1/api/auth/login';
  constructor(
    private rest: RestApiService,
    private authService: AuthService,
    private data: DataService,
    private router: Router
  ) {
    this.employee = new Employee();
  }

  ngOnInit() {}

  validate() {
    return true;
  }
  async login() {
    this.btnDisable = true;

    if (this.validate()) {
      try {
        const response = await this.rest.post(this.url, this.employee);
        let value = response as { token: Token; employee: Employee };
        localStorage.setItem('token', value.token.accessToken);
        localStorage.setItem('refreshToken', value.token.refreshToken);
        this.employeeId = value.employee._id;
        localStorage.setItem('employeeId', this.employeeId.toString());
        await this.data.getProfile();
        this.btnDisable = false;
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.data.error(error.error.message);
        this.btnDisable = false;
      }
    }
  }
}
