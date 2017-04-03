import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/switchMap';

import { Device } from '../resources/device';
import { DeviceService } from '../resources/device.service';

@Component({
  selector: 'device-info',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

export class DeviceComponent {
  device: Device = null;
  errorMessage: string = "";
  successMessage: string="";
  deviceTypes: Array<string> = ["LORA", "TWIST", "FIREFLY", "BOSCH_XDK"];

  constructor(private route: ActivatedRoute, private router: Router, private deviceService: DeviceService, public snackBar: MdSnackBar) {

  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.deviceService.getDeviceById(params['id']))
      .subscribe(
        result => this.device = result,
        error => this.errorMessage = error
      );
  }

  updateDevice() {
    this.deviceService.updateDeviceById(this.device._id, this.device).subscribe(
      result => {
        this.successMessage = "Updated!";
        this.snackBar.open("Device: " + this.device.name, this.successMessage, {duration: 2000});
        this.router.navigate(['/home/device/', this.device._id]);
      },
      error => {
        this.errorMessage = error;
        this.snackBar.open("Device: " + this.device.name, this.errorMessage, {duration: 2000});
      }
    );
  }

  execute(command: any) {
    this.deviceService.executeCommand(this.device._id, command._id).subscribe(
      result => {
        this.snackBar.open("Successfully Executed!", command.name, { duration: 2000 });
      },
      error => {
        this.snackBar.open(error, command.name, { duration: 2000 });
      }
    );
  }

}