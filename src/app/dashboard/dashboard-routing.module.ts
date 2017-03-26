import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceListComponent } from '../devices/devicelist.component';
import { DeviceComponent } from '../devices/device.component';
import { PageNotFoundComponent } from '../404/pagenotfound.component';

const dashboardRoutes: Routes = [
  { path: 'devices/:id', component: DeviceListComponent }, // Location ID
  { path: 'device/:id', component: DeviceComponent }, // Device ID
  { path: '**', component: PageNotFoundComponent }
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