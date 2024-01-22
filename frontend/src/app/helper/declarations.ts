import { AppComponent } from '../app.component';
import { AccordionComponent } from '../components/accordion/accordion.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CheckDisableComponent } from '../components/employee/component/checkDisable/checkDisable.component';
import { EmployeeProjectComponent } from '../components/employee/component/employeeProject/employeeProject.component';
import { EmployeeAddComponent } from '../components/employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from '../components/employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from '../components/employee/employee-list/employee-list.component';
import { LoginComponent } from '../components/login/login.component';
import { MessageComponent } from '../components/message/message.component';
import { PageNotFoundComponent } from '../components/pageNotFound/pageNotFound.component';
import { ProjectAddComponent } from '../components/project/project-add/project-add.component';
import { ProjectEditComponent } from '../components/project/project-edit/project-edit.component';
import { ProjectListComponent } from '../components/project/project-list/project-list.component';
import { TaskAddComponent } from '../components/task/task-add/task-add.component';
import { TaskEditComponent } from '../components/task/task-edit/task-edit.component';
import { TaskListComponent } from '../components/task/task-list/task-list.component';
import { HeaderComponent } from '../layout/header/header.component';

export const declarations = [
  AppComponent,
  MessageComponent,
  EmployeeAddComponent,
  EmployeeListComponent,
  EmployeeEditComponent,
  ProjectAddComponent,
  ProjectEditComponent,
  ProjectListComponent,
  TaskAddComponent,
  TaskEditComponent,
  TaskListComponent,
  LoginComponent,
  DashboardComponent,
  AccordionComponent,
  HeaderComponent,
  PageNotFoundComponent,
  CheckDisableComponent,
  EmployeeProjectComponent,
];
