import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SplashComponent } from './splash/splash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './404/pagenotfound.component';

import { DeviceComponent } from './devices/device.component';
import { DeviceListComponent } from './devices/devicelist.component';

const appRoutes: Routes = [
  { path: '', component: SplashComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      {
        path: 'device/:id',
        component: DeviceComponent
      },
      {
        path: 'devices/:id', 
        component: DeviceListComponent
      }
    ] 
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}