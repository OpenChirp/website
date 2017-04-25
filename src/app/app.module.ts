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
import { SplashComponent } from './splash/splash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './404/pagenotfound.component';
import { TreeNodeComponent, DeleteLocationDialog } from './tree/tree.component';
import { DeviceListComponent } from './devices/devicelist.component';
import { NewLocationComponent } from './locations/newlocation.component';
import { DeviceComponent } from './devices/device.component';
import { DeviceComponent } from './devices/device.component';
import { NewDeviceComponent } from './devices/newdevice.component';
import { DashboardMainComponent } from './dashboard/dashboard-main.component';
import { DeviceTemplatesComponent } from './devices/devicetemplates.component';
import { DeviceTemplateComponent } from './devices/devicetemplate.component';

// Services
import { LocationService } from './resources/location.service';
import { DeviceService } from './resources/device.service';
import { DashboardToolbarComponent } from './dashboard-toolbar/dashboard-toolbar.component';

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
    DeleteLocationDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot(),
    MdInputModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    LocationService,
    DeviceService
  ],
  entryComponents: [
    DeleteLocationDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
