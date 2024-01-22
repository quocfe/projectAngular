import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Api } from 'src/app/constant/api';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';
import { Task } from './../../../../models/task';

@Component({
  selector: 'app-checkDisable',
  templateUrl: './checkDisable.component.html',
  styleUrls: ['./checkDisable.component.css'],
})
export class CheckDisableComponent implements OnInit {
  id!: string;
  employees!: Employee[];
  tasks!: Task[];
  task!: Task;
  confirmMessage = '';
  constructor(
    private modalService: NgbModal,
    private data: DataService,
    private rest: RestApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getEployees();
    this.getTasks();
  }

  async getTasks() {
    try {
      const response = await this.rest.get(`${Api.TASK}`);
      const data: any = response as Task;
      this.tasks = data.data.filter(
        (task: Task) => task.employee == this.id && task.status === 'Progress'
      );
    } catch (error) {
      this.data.error('error');
    }
  }

  async getEployees() {
    try {
      const response = await this.rest.get(`${Api.EMPLOYEE}`);
      const data: any = response as Employee;
      this.employees = data.employees.filter(
        (emp: Employee) =>
          emp._id != this.id &&
          emp.role === 'Employee' &&
          emp.status === 'Working'
      );
    } catch (error) {
      this.data.error('error');
    }
  }
  onEmployeeChange(employeeId: string, task: Task) {
    task.employee = employeeId;

    this.task = task;
  }

  confirmDeleteProject(confirmDialog: TemplateRef<any>) {
    if (this.task === undefined) {
      this.data.error('Vui lòng chọn nhân viên');
      this.modalService.dismissAll();
    } else {
      this.confirmMessage = 'Bàn giao công việc ';
      this.modalService
        .open(confirmDialog, { ariaDescribedBy: 'modal-basic-title' })
        .result.then(
          (result) => {},
          (err) => {}
        );
    }
  }

  async save() {
    try {
      await this.rest.put(Api.TASK, this.task._id, this.task);
      this.data.success('success');
      this.modalService.dismissAll();
      this.getTasks();
    } catch (error: any) {
      this.data.error(error);
    }
  }
}
