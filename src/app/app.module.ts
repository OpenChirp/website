import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { MaterialModule, MdInputModule } from '@angular/material';
import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashComponent } from './components/splash/splash.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/404/pagenotfound.component';
import { TreeNodeComponent, DeleteLocationDialog } from './components/locationtree/tree.component';
import { DeviceListComponent } from './components/devices/devicelist.component';
import { NewLocationComponent } from './components/locations/newlocation.component';
import { DeviceComponent } from './components/devices/device.component';
import { NewDeviceComponent } from './components/devices/newdevice.component';
import { DashboardMainComponent } from './components/dashboard/dashboard-main.component';
import { DeviceTemplatesComponent } from './components/devices/devicetemplates.component';
import { DeviceTemplateComponent } from './components/devices/devicetemplate.component';
import { NewTemplateComponent } from './components/devices/newtemplate.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { UserDevicesComponent } from './components/devices/userdevices.component';
import { UserLocationsComponent } from './components/locations/userlocations.component';
import { UserServicesComponent } from './components/userservices/userservices.component';
import { UserServiceComponent } from './components/userservices/userservice.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DevicePropertiesComponent } from './components/devices/device-information/device-properties.component';
import { DeviceTransducersComponent } from './components/devices/device-information/device-transducers.component';
import { DeviceCommandsComponent } from './components/devices/device-information/device-commands.component';
import { DeviceServicesComponent } from './components/devices/device-information/device-services.component';

// Services
import { LocationService } from './services/location.service';
import { DeviceService } from './services/device.service';
import { SuccessDialogService } from './services/success-dialog.service';
import { UserService } from './services/user.service';
import { ErrorDialogService } from './services/error-dialog.service';

import { Configuration } from './config';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    DashboardComponent,
    DashboardMainComponent,
    PageNotFoundComponent,
    TreeNodeComponent,
    DeviceListComponent,
    DeviceComponent,
    NewDeviceComponent,
    NewLocationComponent,
    DeleteLocationDialog,
    DeviceTemplatesComponent,
    DeviceTemplateComponent,
    NewTemplateComponent,
    DeleteLocationDialog,
    SuccessDialogComponent,
    ErrorDialogComponent,
    UserDevicesComponent,
    UserLocationsComponent,
    UserServicesComponent,
    UserServiceComponent,
    ErrorDialogComponent,
    DevicePropertiesComponent,
    DeviceTransducersComponent,
    DeviceCommandsComponent,
    DeviceServicesComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    MdInputModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    LocationService,
    DeviceService,
    SuccessDialogService,
    ErrorDialogService,
    UserService,
    Configuration
  ],
  entryComponents: [
    DeleteLocationDialog,
    SuccessDialogComponent,
    ErrorDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
