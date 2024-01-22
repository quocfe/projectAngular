import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';
import { Api } from '../../../constant/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks!: Task[] | undefined;
  deleteId!: string;
  confirmMessage = '';
  url!: string;
  constructor(
    private rest: RestApiService,
    protected data: DataService,
    private modalService: NgbModal,
    public authService: AuthService
  ) {}

  confirmDeleteTask(confirmDialog: TemplateRef<any>, id: string, name: string) {
    this.confirmMessage = `Do you want to delete the task ${name}`;
    this.deleteId = id;
    this.modalService
      .open(confirmDialog, { ariaDescribedBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.deleteId = '';
        },
        (err) => {}
      );
  }

  async deleteProject() {
    if (this.deleteId === '') return;
    try {
      const data = await this.rest.delete(Api.TASK, this.deleteId);
      this.data.success((data as { message: string }).message);
      this.modalService.dismissAll();
      this.ngOnInit();
    } catch (error) {
      this.data.error('error');
    }
  }

  async ngOnInit() {
    const id = localStorage.getItem('employeeId');
    try {
      this.data.isAdmin
        ? (this.url = `${Api.TASK}/withNameEmployee`)
        : (this.url = `${Api.TASK}/employee/${id}`);

      const data = await this.rest.get(this.url);
      this.tasks = (data as { data: Task[] }).data;
    } catch (error: any) {
      this.data.error(error.error);
    }
  }

  getTaskRowClass(task: any): string {
    if (task.status === 'Completed' && this.data.isAdmin) {
      return 'bg-success text-white';
    } else if (task.status === 'Cancelled' && this.data.isAdmin) {
      return 'bg-danger text-white';
    } else {
      return '';
    }
  }

  finishAndAlert(message: string) {
    this.data.success(message);
    this.ngOnInit();
  }
}
