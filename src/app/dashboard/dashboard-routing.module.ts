import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardLayoutComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
