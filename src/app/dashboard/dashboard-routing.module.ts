import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceListComponent } from '../devices/devicelist.component';
import { DeviceComponent } from '../devices/device.component';
import { PageNotFoundComponent } from '../404/pagenotfound.component';
import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent, 
    children: [
      {
        path: 'device',
        component: DeviceComponent
      },
      {
        path: 'devices/:id', 
        component: DeviceListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class DashboardRoutingModule {

}