import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SplashComponent } from './splash/splash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardMainComponent } from './dashboard/dashboard-main.component';
import { PageNotFoundComponent } from './404/pagenotfound.component';
import { NewLocationComponent } from './locations/newlocation.component';
import { DeviceTemplatesComponent } from './devices/devicetemplates.component';
import { DeviceComponent } from './devices/device.component';
import { DeviceListComponent } from './devices/devicelist.component';
import { NewDeviceComponent } from './devices/newdevice.component';
import { DeviceTemplateComponent } from './devices/devicetemplate.component';
import { NewTemplateComponent } from './devices/newtemplate.component';

const appRoutes: Routes = [
  { path: '', component: SplashComponent },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardMainComponent
      },
      {
        path: 'device/:id',       // Device ID
        component: DeviceComponent
      },
      {
        path: 'devices/:id',      // Location ID
        component: DeviceListComponent
      },
      {
        path: 'newlocation/:id',  // Parent Location ID
        component: NewLocationComponent
      },
      {
        path: 'newdevice',
        component: NewDeviceComponent
      },
      {
        path: 'devicetemplates',
        component: DeviceTemplatesComponent
      },
      {
        path: 'devicetemplate/:id', // Template ID
        component: DeviceTemplateComponent
      },
      {
        path: 'newtemplate/:id',    // Device ID
        component: NewTemplateComponent
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
