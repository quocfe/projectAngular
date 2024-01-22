import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
})
export class ProjectAddComponent implements OnInit {
  project: Project;
  btnDisable!: false;
  url = 'http://localhost:3000/v1/api/project';

  @Output()
  savingFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modalService: NgbModal,
    private data: DataService,
    private rest: RestApiService
  ) {
    this.project = new Project();
  }
  ngOnInit() {}

  open(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  validate() {
    console.log(this.project);
    return true;
  }

  async save() {
    if (this.validate()) {
      try {
        await this.rest.post(this.url, this.project);
        this.savingFinished.emit('New project is saved!');
        this.modalService.dismissAll();
        this.project = new Project();
        this.btnDisable = false;
      } catch (error) {
        this.data.error('error');
        this.btnDisable = false;
      }
    }
  }
}
