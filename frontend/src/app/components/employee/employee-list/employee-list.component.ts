import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Api } from 'src/app/constant/api';
import { Employee } from 'src/app/models/employee';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee | undefined;
  employeeIDCheck: any[] = [];
  tasks!: Task[];
  btnDisable = false;
  url = 'http://localhost:3000/v1/api/accounts';
  deleteId = '';
  confirmMessage = '';
  isDelete!: boolean;
  checkExistTask!: boolean;

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.btnDisable = true;
    this.getEmployees();
    this.checktask();
  }

  async checktask() {
    const response = await this.rest.get(`${Api.TASK}`);

    this.tasks = (response as { data: Task[] }).data;

    this.tasks.forEach((task) => {
      if (task.status === 'Progress') {
        console.log('task', task);
        const employeeId: string = task.employee;

        const existingEmployee = this.employeeIDCheck.find(
          (emp) => emp._id === employeeId
        );

        if (!existingEmployee) {
          this.employeeIDCheck.push({
            _id: employeeId,
          });
        }
      }
    });
  }

  async getEmployees() {
    try {
      const data = await this.rest.get(this.url);
      this.employees = (data as { employees: Employee[] }).employees;
    } catch (error: any) {
      this.data.error(error.error);
      this.btnDisable = false;
    }
  }

  confirmDeleteProject(
    confirmDialog: TemplateRef<any>,
    id: string,
    name: string
  ) {
    this.employee = this.employees.find((emp) => emp._id === id);
    if (this.employee) {
      this.checkExistTask = this.employeeIDCheck.find((item) => item._id == id);
      if (!this.checkExistTask) {
        this.confirmMessage = `Do you want to ${
          this.employee.status === 'Resigned' ? 'enable' : 'disable'
        } employee ${name}`;
        this.deleteId = id;
        this.modalService
          .open(confirmDialog, { ariaDescribedBy: 'modal-basic-title' })
          .result.then(
            (result) => {
              this.deleteId = '';
            },
            (err) => {}
          );
      } else {
        this.confirmMessage = `Nhân viên đang còn task, vui lòng bàn giao công việc trước khi thực hiện tiếp thao tác!`;
        this.deleteId = id;
        this.modalService
          .open(confirmDialog, { ariaDescribedBy: 'modal-basic-title' })
          .result.then(
            (result) => {},
            (err) => {}
          );
      }
    }
  }

  async delete(check: boolean) {
    if (check) {
      try {
        if (this.employee) {
          const status =
            this.employee.status === 'Working' ? 'Resigned' : 'Working';
          await this.rest.put(this.url, this.deleteId, { status });
          this.modalService.dismissAll();
          this.getEmployees();
        }
      } catch (error) {
        this.data.error('error');
        this.btnDisable = true;
      }
    } else {
      this.router.navigate([`task/admin/edit/${this.deleteId}`]);
      this.modalService.dismissAll();
    }
  }

  finishAndAlert(message: string) {
    this.data.success(message);
    this.ngOnInit();
  }
}
