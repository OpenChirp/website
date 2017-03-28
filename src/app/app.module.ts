import { BrowserModule } from '@angular/platform-browser';
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
import { TreeNodeComponent } from './tree/tree.component';
import { DeviceListComponent } from './devices/devicelist.component';
import { NewLocationComponent } from './locations/newlocation.component';
import { DeviceComponent } from './devices/device.component'; 

// Services
import { LocationService } from './resources/location.service';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    DashboardComponent,
    PageNotFoundComponent, 
    TreeNodeComponent,
    DeviceListComponent,
    DeviceComponent,
    NewLocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot(),
    MdInputModule,
    AppRoutingModule
  ],
  providers: [
    LocationService
  ],
  entryComponents: [
    NewLocationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
