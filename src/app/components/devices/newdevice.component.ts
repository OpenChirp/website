import { Component } from '@angular/core';
import { MdInputModule, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'new-device',
  templateUrl: './newdevice.component.html',
  styleUrls: ['./newdevice.component.scss']
})
export class NewDeviceComponent {
  location: Location = null;
  name: string = "";
  enabled: boolean = true;
  deviceTypes: Array<string> = ["LORA", "TWIST", "FIREFLY", "BOSCH_XDK"];
  selectedType: string = "";
  useTemplate: boolean = false;
  templates: Array<Object> = [];
  template: any = null;
  templateid = "";

  constructor(private deviceService: DeviceService, private locationService: LocationService, private route: ActivatedRoute, private router: Router, public snackBar: MdSnackBar) {

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
    if (!tem && !loc) {
      this.router.navigate(['/home']);
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
      if (this.deviceTypes) {
        body["type"] = this.selectedType;
      }
      if (this.useTemplate) {
        if (this.templateid != "") {
          body["template_id"] = this.templateid;
        }
        else {
          valid = false;
          this.snackBar.open("Select Template!", this.name, { duration: 2000 });
        }
      }
      if (valid) {
        this.deviceService.addDevice(body).subscribe(
          result => {
            this.snackBar.open("Add Device Sucess!", this.name, { duration: 2000 }).afterDismissed().subscribe(
              res => this.router.navigate(['/home/device/', result._id]),
              err => this.router.navigate(['/home'])
            );
          },
          error => {
            this.snackBar.open(error.message, this.name, { duration: 2000 });
          }
        );
      }
    }
    else {
      this.snackBar.open("Name cannot be empty!", "ERROR", { duration: 2000 });
    }
  
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}