import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { DeviceService } from '../../services/device.service';
import { SuccessDialogService } from '../../services/success-dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ErrorDialogService } from '../../services/error-dialog.service';
import { SelectTemplateComponent } from './select-template.component';

@Component({
  selector: 'new-device',
  templateUrl: './newdevice.component.html',
  styleUrls: ['./newdevice.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewDeviceComponent {
  location: Location = null;
  name: string = "";
  enabled: boolean = true;
  //deviceTypes: Array<string> = ["LORA", "TWIST", "FIREFLY", "BOSCH_XDK"];
  selectedType: string = "";
  useTemplate: boolean = false;
  templates: Array<Object> = [];
  template: any = null;
  templateid = "";

  constructor(private deviceService: DeviceService, 
              private locationService: LocationService,
              private route: ActivatedRoute, private router: Router,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              public dialog: MdDialog) {

  }

  ngOnInit() {
    // Get Device Templates
    this.deviceService.deviceTemplates().subscribe(
      result => this.templates = result,
      error => this.templates = []
    );

    var loc = false;
    var tem = false;
    this.route.params.subscribe((params: Params) => {
      if (params['location_id']) {
        loc = true;
      }
      if (params['template_id']) {
        tem = true;
      }
    });

    // From Location
    if (loc) {
      this.route.params
        .switchMap((params: Params) => this.locationService.getLocationById(params['location_id']))
        .subscribe(result => this.location = result);
    }
    // From Device Template
    if (tem) {
      this.route.params
        .switchMap((params: Params) => this.deviceService.deviceTemplate(params['template_id']))
        .subscribe(result => {
          this.template = result;
          this.templateid = this.template._id;
          this.useTemplate = true;
        });
    }
  }

  add() {
    if (this.name != "") {
      var valid = true;
      var body : any = {};
      body["name"] = this.name;
      body["enabled"] = this.enabled;
      if (this.location) {
        body["location_id"] = this.location._id;
      }
      /*if (this.deviceTypes) {
        body["type"] = this.selectedType;
      }*/
      if (this.useTemplate) {
        if (this.templateid != "") {
          body["template_id"] = this.templateid;
        }
        else {
          valid = false;
          this.errorDialogService.dialogPopup(ErrorDialogComponent, 'Select a Template!');
        }
      }
      if (valid) {
        this.deviceService.addDevice(body).subscribe(
          result => {
            this.successDialogService
              .dialogPopup(SuccessDialogComponent, 'Add Device Success: ' + this.name)
              .subscribe(
              res => this.router.navigate(['/home/device/', result._id]),
              err => this.router.navigate(['/home'])
            );
          },
          error => {
            this.errorDialogService
              .dialogPopup(ErrorDialogComponent, error.message + ': ' + this.name);
          }
        );
      }
    } else {
      this.errorDialogService
        .dialogPopup(ErrorDialogComponent, 'Name cannot be empty!');
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  selectTemplate() {
    var dialogRef = this.dialog.open(SelectTemplateComponent, { width: '700px', height: '700px' });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.template = result;
          this.templateid = this.template._id;
        }
      }
    );
  }
}