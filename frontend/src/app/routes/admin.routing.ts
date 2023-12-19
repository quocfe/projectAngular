import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { Authguard } from './authguard';

const routes: Routes = [
  { path: 'admin', component: DashboardComponent, canActivate: [Authguard] },
];

export const AdminRoutes = RouterModule.forChild(routes);
