import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {HttpModule, JsonpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import {
  MdcCardModule,
  MdcDrawerModule,
  MdcIconModule,
  MdcListModule,
  MdcMenuModule,
  MdcTopAppBarModule,
  MdcTypographyModule,
} from '@angular-mdc/web';

import 'hammerjs';
// Components
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SplashComponent} from './components/splash/splash.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './components/404/pagenotfound.component';
import {TreeNodeComponent} from './components/locationtree/tree.component';
import {DeviceListComponent} from './components/devices/devicelist.component';
import {LocationComponent} from './components/locations/location.component';
import {DeviceComponent} from './components/devices/device.component';
import {NewDeviceComponent} from './components/devices/newdevice.component';
import {NewDeviceGroupComponent} from './components/devices/newdevicegroup.component';
import {DashboardMainComponent} from './components/dashboard/dashboard-main.component';
import {DeviceTemplatesComponent} from './components/device-templates/devicetemplates.component';
import {DeviceTemplateComponent} from './components/device-templates/devicetemplate.component';
import {NewTemplateComponent} from './components/device-templates/newtemplate.component';
import {SuccessDialogComponent} from './components/dialogs/success-dialog.component';
import {ErrorDialogComponent} from './components/dialogs/error-dialog.component';
import {UserDevicesComponent} from './components/devices/userdevices.component';
import {UserLocationsComponent} from './components/locations/userlocations.component';
import {UserServicesComponent} from './components/userservices/userservices.component';
import {InfraServiceComponent} from './components/infraservices/infraservice.component';
import {InfraServicePropertiesComponent} from './components/infraservices/infraservice-information/infraservice-properties.component';
import {InfraServiceDeviceListComponent} from './components/infraservices/infraservice-information/infraservice-devicelist.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {DevicePropertiesComponent} from './components/devices/device-information/device-properties.component';
import {DeviceTransducersComponent} from './components/devices/device-information/device-transducers.component';
import {DeviceCommandsComponent} from './components/devices/device-information/device-commands.component';
import {DeviceServicesComponent} from './components/devices/device-information/device-services.component';
import {DeviceVisualizationComponent} from './components/devices/device-information/device-visualization.component';
import {SelectDeviceComponent} from './components/devices/select-device.component';
import {GroupedDevicesComponent} from './components/devices/device-groups/grouped-devices.component';
import {SelectTemplateComponent} from './components/device-templates/select-template.component';
import {ConfirmationDialogComponent} from './components/dialogs/confirmation-dialog.component';
import {PropertiesComponent} from './components/dialogs/properties.component';
import {ListInfraServicesComponent} from './components/infraservices/list.infraservices.component';
import {ConfigRequiredComponent} from './components/infraservices/config.required.component';
import {NewInfraServiceComponent} from './components/infraservices/new.infraservice.component';
import {SelectServiceComponent} from './components/infraservices/select-service.component';
import {InputConfigComponent} from './components/dialogs/input-config.component';
import {InputTransducerValueComponent} from './components/dialogs/input-transducer-value.component';
import {GroupComponent} from './components/groups/group.component';
import {AdminComponent} from './components/admin/admin.component';
import {NewGroupComponent} from './components/groups/newgroup.component';
import {GroupMembersComponent} from './components/groups/groupmembers.component';
import {UserGroupsComponent} from './components/groups/usergroups.component';
import {UpdateConfigComponent} from './components/dialogs/update-config.component';
import {ViewConfigComponent} from './components/dialogs/view-config.component';
import {PublicLinkComponent} from './components/publiclink/public-link.component';
import {DeviceAclComponent} from './components/devices/device-information/device-acl.component';
import {StatsComponent} from './components/admin/stats/stats.component';
import {UserProfileComponent} from './components/userprofile/userprofile.component';
import {AdminDeviceListComponent} from './components/admin/devices/admin-devicelist.component';
import {AdminDeviceGroupListComponent} from './components/admin/devices/admin-devicegrouplist.component';
import {GoogleLoginComponent} from './components/login/googlelogin.component';
import {LoginComponent} from './components/login/login.component';
import {SelectLocationComponent} from './components/locations/select-location.component';
import {EditTransducerComponent} from './components/devices/device-information/edit-transducer.component';
// Services
import {LocationService} from './services/location.service';
import {DeviceService} from './services/device.service';
import {DeviceGroupService} from './services/device-group.service';
import {SuccessDialogService} from './services/success-dialog.service';
import {UserService} from './services/user.service';
import {ErrorDialogService} from './services/error-dialog.service';
import {InfraService} from './services/infraservice';
import {GroupService} from './services/group.service';
import {Configuration} from './config';
import {GlobalDataService} from './services/global.data.service';
import {AdminService} from './services/admin.service';
import {AuthService} from './services/auth.service';

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
    NewDeviceGroupComponent,
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
    InfraServicePropertiesComponent,
    InfraServiceDeviceListComponent,
    ErrorDialogComponent,
    DevicePropertiesComponent,
    DeviceTransducersComponent,
    DeviceCommandsComponent,
    DeviceServicesComponent,
    DeviceVisualizationComponent,
    SelectDeviceComponent,
    GroupedDevicesComponent,
    SelectTemplateComponent,
    ConfirmationDialogComponent,
    PropertiesComponent,
    GalleryComponent,
    ListInfraServicesComponent,
    ConfigRequiredComponent,
    NewInfraServiceComponent,
    SelectServiceComponent,
    InputConfigComponent,
    InputTransducerValueComponent,
    GroupComponent,
    AdminComponent,
    NewGroupComponent,
    GroupMembersComponent,
    UserGroupsComponent,
    UpdateConfigComponent,
    ViewConfigComponent,
    PublicLinkComponent,
    DeviceAclComponent,
    StatsComponent,
    UserProfileComponent,
    LoginComponent,
    GoogleLoginComponent,
    AdminDeviceListComponent,
    AdminDeviceGroupListComponent,
    SelectLocationComponent,
    EditTransducerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MdcTopAppBarModule,
    MdcMenuModule,
    MdcDrawerModule,
    MdcListModule,
    MdcIconModule,
    MdcCardModule,
    MdcTypographyModule,
  ],
  providers: [
    LocationService,
    DeviceService,
    DeviceGroupService,
    SuccessDialogService,
    ErrorDialogService,
    UserService,
    InfraService,
    GroupService,
    Configuration,
    GlobalDataService,
    AdminService,
    AuthService
  ],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    SelectTemplateComponent,
    SelectServiceComponent,
    SelectDeviceComponent,
    PropertiesComponent,
    ConfigRequiredComponent,
    InputConfigComponent,
    InputTransducerValueComponent,
    NewGroupComponent,
    UpdateConfigComponent,
    ViewConfigComponent,
    PublicLinkComponent,
    SelectLocationComponent,
    EditTransducerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
