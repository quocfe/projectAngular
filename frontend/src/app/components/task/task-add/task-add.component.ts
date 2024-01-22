import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';
import { Api } from '../../../constant/api';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent implements OnInit {
  task!: Task;
  projects!: Project[];
  employees!: Employee[];
  btnDisable!: false;
  url = 'http://localhost:3000/v1/api/task';
  @Output()
  savingFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modalService: NgbModal,
    private data: DataService,
    private rest: RestApiService
  ) {
    this.task = new Task();
  }
  async ngOnInit() {
    this.getProject();
    this.getEmployee();
  }

  async getProject() {
    try {
      const data = await this.rest.get(Api.PROJECT);
      this.projects = (data as { data: Project[] }).data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  }

  async getEmployee() {
    try {
      const data = await this.rest.get(Api.EMPLOYEE);
      this.employees = (data as { employees: Employee[] }).employees;
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  validate() {
    return true;
  }

  async save() {
    if (this.validate()) {
      try {
        const employeeId = localStorage.getItem('employeeId');
        const taskClone = this.task;
        if (!employeeId) return;
        taskClone['employee'] = employeeId;
        await this.rest.post(this.url, taskClone);
        this.savingFinished.emit('New task is saved!');
        this.modalService.dismissAll();
        this.task = new Task();
        this.btnDisable = false;
      } catch (error) {
        this.data.error('error');
        this.btnDisable = false;
      }
    }
  }
}
