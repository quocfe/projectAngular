import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';
import { Api } from '../../../constant/api';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  task!: Task;
  show = false;
  projects!: Project[];
  @Input()
  id!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal
  ) {
    this.task = new Task();
    this.getProject();
  }

  async getProject() {
    try {
      const data = await this.rest.get(Api.PROJECT);
      this.projects = (data as { data: Project[] }).data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  }

  async ngOnInit() {
    this.show = true;
    try {
      this.show = false;
      const data = await this.rest.getOne(Api.TASK, this.id);
      this.task = (data as { data: Task }).data;
    } catch (error) {
      this.show = false;
      console.log(error);
    }
  }

  open(content: TemplateRef<any>) {
    this.data.message = '';
    this.modalService.open(content);
  }
  async update() {
    try {
      const employeeId = localStorage.getItem('employeeId');
      const taskClone = this.task;
      if (!employeeId) return;
      taskClone['employee'] = employeeId;
      await this.rest.put(Api.TASK, this.id, taskClone);
      this.updateFinished.emit('The task is updated!');
      this.modalService.dismissAll();
      this.task = new Task();
    } catch (error) {
      this.show = false;
      this.data.error('error');
    }
  }
}
