import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit {
  project!: Project;
  show = false;
  url = 'http://localhost:3000/v1/api/project';

  @Input()
  id!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal
  ) {
    this.project = new Project();
  }

  async ngOnInit() {
    this.show = true;
    try {
      this.show = false;
      const data = await this.rest.getOne(this.url, this.id);
      this.project = (data as { data: Project }).data;
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
      await this.rest.put(this.url, this.id, this.project);
      this.updateFinished.emit('The project is updated!');
      this.modalService.dismissAll();
      this.project = new Project();
    } catch (error) {
      this.show = false;
      this.data.error('error');
    }
  }
}
