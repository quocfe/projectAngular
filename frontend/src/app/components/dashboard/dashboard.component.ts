import { Component, OnInit } from '@angular/core';
import { AccordionComponent } from '../accordion/accordion.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';
import { Project } from 'src/app/models/project';
import { Api } from 'src/app/constant/api';
import { DataService } from 'src/app/services/data/data.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  projects!: Project[];
  tasks!: Task[];
  projectsWithEmployee!: any[];
  progressProject!: any;

  constructor(public data: DataService, private rest: RestApiService) {}

  async ngOnInit() {
    await this.loadProjects();
    await this.loadTasks();
    await this.matchProjectsAndTasks();
  }

  async loadProjects() {
    try {
      const data = await this.rest.get(Api.PROJECT);
      this.projects = (data as { data: Project[] }).data;
    } catch (error) {
      this.data.error('Error loading projects');
    }
  }

  async loadTasks() {
    try {
      const dataTask = await this.rest.get(Api.TASK);
      this.tasks = (dataTask as { data: Task[] }).data;
    } catch (error) {
      this.data.error('Error loading tasks');
    }
  }

  async matchProjectsAndTasks() {
    const employeeId = localStorage.getItem('employeeId');
    const taskCurrent = this.tasks.filter(
      (task) => task.employee == employeeId
    );

    this.projectsWithEmployee = this.projects.filter((prj) =>
      taskCurrent.some((tc) => prj._id == tc.project)
    );

    const completionPercentageByProject = this.projectsWithEmployee.map(
      (project) => {
        const projectTasks = this.tasks.filter(
          (task) => task.project === project._id
        );
        const completedTasks = projectTasks.filter(
          (task) => task.status === 'Completed'
        );
        const completionPercentage =
          (completedTasks.length / projectTasks.length) * 100 || 0;

        return { ...project, percen: completionPercentage };
      }
    );

    this.projectsWithEmployee = completionPercentageByProject;
  }
}
