import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { MaterialModule, MdInputModule, MdCardModule } from '@angular/material';
import { MdDataTableModule } from 'ng2-md-datatable';
import { MdlModule } from '@angular-mdl/core'

import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashComponent } from './components/splash/splash.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/404/pagenotfound.component';
import { TreeNodeComponent } from './components/locationtree/tree.component';
import { DeviceListComponent } from './components/devices/devicelist.component';
import { LocationComponent } from './components/locations/location.component';
import { DeviceComponent } from './components/devices/device.component';
import { NewDeviceComponent } from './components/devices/newdevice.component';
import { DashboardMainComponent } from './components/dashboard/dashboard-main.component';
import { DeviceTemplatesComponent } from './components/device-templates/devicetemplates.component';
import { DeviceTemplateComponent } from './components/device-templates/devicetemplate.component';
import { NewTemplateComponent } from './components/device-templates/newtemplate.component';
import { SuccessDialogComponent } from './components/dialogs/success-dialog.component';
import { ErrorDialogComponent } from './components/dialogs/error-dialog.component';
import { UserDevicesComponent } from './components/devices/userdevices.component';
import { UserLocationsComponent } from './components/locations/userlocations.component';
import { UserServicesComponent } from './components/userservices/userservices.component';
import { InfraServiceComponent } from './components/infraservices/infraservice.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DevicePropertiesComponent } from './components/devices/device-information/device-properties.component';
import { DeviceTransducersComponent } from './components/devices/device-information/device-transducers.component';
import { DeviceCommandsComponent } from './components/devices/device-information/device-commands.component';
import { DeviceServicesComponent } from './components/devices/device-information/device-services.component';
import { DeviceVisualizationComponent } from './components/devices/device-information/device-visualization.component';
import { SelectTemplateComponent } from './components/device-templates/select-template.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog.component';
import { PropertiesComponent } from './components/dialogs/properties.component';
import { ListInfraServicesComponent } from './components/infraservices/list.infraservices.component';
import { ConfigRequiredComponent } from './components/infraservices/config.required.component';
import { NewInfraServiceComponent } from './components/infraservices/new.infraservice.component'; 
import { SelectServiceComponent } from './components/infraservices/select-service.component';
import { InputConfigComponent } from './components/dialogs/input-config.component';
import { GroupComponent } from './components/groups/group.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewGroupComponent } from './components/groups/newgroup.component';
import { GroupMembersComponent } from './components/groups/groupmembers.component';
import { UserGroupsComponent } from './components/groups/usergroups.component';
import { UpdateConfigComponent } from './components/dialogs/update-config.component';
import { PublicLinkComponent } from './components/publiclink/public-link.component';
import { DeviceAclComponent } from './components/devices/device-information/device-acl.component';
import { StatsComponent } from './components/admin/stats/stats.component';
import { UserProfileComponent } from './components/userprofile/userprofile.component';

// Services
import { LocationService } from './services/location.service';
import { DeviceService } from './services/device.service';
import { SuccessDialogService } from './services/success-dialog.service';
import { UserService } from './services/user.service';
import { ErrorDialogService } from './services/error-dialog.service';
import { InfraService } from './services/infraservice';
import { GroupService } from './services/group.service';
import { Configuration } from './config';
import { GlobalDataService } from './services/global.data.service';
import { AdminService } from './services/admin.service';

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
    LocationComponent,
    DeviceTemplatesComponent,
    DeviceTemplateComponent,
    NewTemplateComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    UserDevicesComponent,
    UserLocationsComponent,
    UserServicesComponent,
    InfraServiceComponent,
    ErrorDialogComponent,
    DevicePropertiesComponent,
    DeviceTransducersComponent,
    DeviceCommandsComponent,
    DeviceServicesComponent,
    DeviceVisualizationComponent,
    SelectTemplateComponent,
    ConfirmationDialogComponent,
    PropertiesComponent,
    GalleryComponent,
    ListInfraServicesComponent,
    ConfigRequiredComponent,
    NewInfraServiceComponent,
    SelectServiceComponent,
    InputConfigComponent,
    GroupComponent,
    AdminComponent,
    NewGroupComponent,
    GroupMembersComponent,
    UserGroupsComponent,
    UpdateConfigComponent,
    PublicLinkComponent,
    DeviceAclComponent,
    StatsComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    MdInputModule,
    MdCardModule,
    BrowserAnimationsModule,
    MdDataTableModule,
    AppRoutingModule,
    MdlModule
  ],
  providers: [
    LocationService,
    DeviceService,
    SuccessDialogService,
    ErrorDialogService,
    UserService,
    InfraService,
    GroupService,
    Configuration,
    GlobalDataService,
    AdminService
  ],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    SelectTemplateComponent,
    SelectServiceComponent,
    PropertiesComponent,  
    ConfigRequiredComponent,
    InputConfigComponent,
    NewGroupComponent,
    UpdateConfigComponent,
    PublicLinkComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
