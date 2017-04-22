import { Component } from '@angular/core';
import { MdInputModule, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '../resources/location';
import { LocationService } from '../resources/location.service';
import { DeviceService } from '../resources/device.service';

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
  templateid = "";

  constructor(private deviceService: DeviceService, private locationService: LocationService, private route: ActivatedRoute, private router: Router, public snackBar: MdSnackBar) {

  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.locationService.getLocationById(params['id']))
      .subscribe(
        result => this.location = result,
        error => {
          this.router.navigate(['/home']);
        }
      );
    this.deviceService.deviceTemplates().subscribe(
      result => this.templates = result,
      error => this.templates = []
    );
  }

  add() {
    if (this.name != "") {
      var body : any = {};
      body["name"] = this.name;
      body["enabled"] = this.enabled;
      if (this.location) {
        body["location_id"] = this.location._id;
      }
      if (this.deviceTypes) {
        body["type"] = this.selectedType;
      }
      if (this.useTemplate && this.templateid != "") {
        body["template_id"] = this.templateid;
      }
      this.deviceService.addDevice(body).subscribe(
        result => {
          this.snackBar.open("Add Device Sucess!", this.name, { duration: 2000 });
        },
        error => {
          this.snackBar.open(error.message, this.name, { duration: 2000 });
        }
      );
    }
    else {
      this.snackBar.open("Name cannot be empty!", "ERROR", { duration: 2000 });
    }
  
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}