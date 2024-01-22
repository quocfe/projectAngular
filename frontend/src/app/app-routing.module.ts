import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectAddComponent } from './components/project/project-add/project-add.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { TaskAddComponent } from './components/task/task-add/task-add.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { AuthGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';
import { CheckDisableComponent } from './components/employee/component/checkDisable/checkDisable.component';
import { EmployeeProjectComponent } from './components/employee/component/employeeProject/employeeProject.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: DashboardComponent },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: EmployeeAddComponent },
      { path: 'list', component: EmployeeListComponent },
      { path: 'edit/:id', component: EmployeeEditComponent },
    ],
  },
  {
    path: 'project',
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: ProjectAddComponent },
      { path: 'list', component: ProjectListComponent },
      { path: 'edit/:id', component: ProjectListComponent },
    ],
  },
  {
    path: 'task',
    children: [
      { path: 'add', component: TaskAddComponent },
      { path: 'list', component: TaskListComponent },
      { path: 'edit/:id', component: TaskListComponent },
      { path: 'admin/edit/:id', component: CheckDisableComponent },
    ],
  },
  { path: 'employee/project/:id', component: EmployeeProjectComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
