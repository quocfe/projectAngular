import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects!: Project[] | undefined;
  url = 'http://localhost:3000/v1/api/project';
  deleteId!: string;
  confirmMessage = '';

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal
  ) {}

  confirmDeleteProject(
    confirmDialog: TemplateRef<any>,
    id: string,
    name: string
  ) {
    this.confirmMessage = `Do you want to delete the project ${name}`;
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
      const data = await this.rest.delete(this.url, this.deleteId);
      this.data.success((data as { message: string }).message);
      this.modalService.dismissAll();
      this.ngOnInit();
    } catch (error) {
      this.data.error('error');
    }
  }

  async ngOnInit() {
    try {
      const data = await this.rest.get(this.url);
      this.projects = (data as { data: Project[] }).data;
      console.log(this.projects);
    } catch (error: any) {
      this.data.error(error.error);
    }
  }

  finishAndAlert(message: string) {
    this.data.success(message);
    this.ngOnInit();
  }
}
