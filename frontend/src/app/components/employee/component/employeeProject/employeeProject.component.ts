import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/app/constant/api';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data/data.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-employeeProject',
  templateUrl: './employeeProject.component.html',
  styleUrls: ['./employeeProject.component.css'],
})
export class EmployeeProjectComponent implements OnInit {
  id!: string;
  tasks!: any;
  totalTask!: number;

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getTasks();
  }

  async getTasks() {
    const response = await this.rest.get(`${Api.TASK}/withProjectEmployee`);
    const tasksData = (response as { data: any }).data;

    this.tasks = tasksData.filter((task: any) => task.project._id == this.id);
  }
}
