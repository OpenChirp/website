import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SplashComponent } from './components/splash/splash.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardMainComponent } from './components/dashboard/dashboard-main.component';
import { PageNotFoundComponent } from './components/404/pagenotfound.component';
import { NewLocationComponent } from './components/locations/newlocation.component';
import { DeviceTemplatesComponent } from './components/devices/devicetemplates.component';
import { DeviceComponent } from './components//devices/device.component';
import { DeviceListComponent } from './components/devices/devicelist.component';
import { NewDeviceComponent } from './components/devices/newdevice.component';
import { DeviceTemplateComponent } from './components/devices/devicetemplate.component';
import { NewTemplateComponent } from './components/devices/newtemplate.component';
import { UserDevicesComponent } from './components/devices/userdevices.component';
import { UserLocationsComponent } from './components/locations/userlocations.component';
import { UserServicesComponent } from './components/userservices/userservices.component';
import { UserServiceComponent } from './components/userservices/userservice.component';

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
      },
      {
        path: 'mydevices',
        component: UserDevicesComponent
      },
      {
        path: 'mylocations',
        component: UserLocationsComponent
      },
      {
        path: 'myservices',
        component: UserServicesComponent
      },
      {
        path: 'service/:id',      // Service ID
        component: UserServiceComponent
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
