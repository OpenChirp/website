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
  successMessage: string = "";
  deviceTypes: Array<string> = ["LORA", "TWIST", "FIREFLY", "BOSCH_XDK"];

  // New Transducer
  t_name: string = "";
  t_unit: string = "";
  t_actuable: boolean = false;

  // New Command
  c_name: string = "";
  c_value: string = "";
  c_transducer: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private deviceService: DeviceService, public snackBar: MdSnackBar) {

  }

  ngOnInit() {
    this.getDevice();
  }

  saveTemplate() {
    if (this.device) {
      this.snackBar.open("Not Yet Implemented.", this.device.name, {duration: 2000});
    }
  }

  getDevice() {
    this.route.params
      .switchMap((params: Params) => this.deviceService.getDeviceById(params['id']))
      .subscribe(
        result => this.device = result,
        error => this.errorMessage = error.message
      );
  }

  deleteDevice() {
    if (this.device) {
      this.deviceService.deleteDevice(this.device._id).subscribe(
        result => {
          this.snackBar.open("Successfully Deleted!", this.device.name, {duration: 2000});
          this.router.navigate(['/home']);
        },
        error => this.snackBar.open(error.message, this.device.name, {duration: 2000})
      );
    }
  }

  updateDevice() {
    this.deviceService.updateDeviceById(this.device._id, this.device).subscribe(
      result => {
        this.successMessage = "Updated!";
        this.snackBar.open(this.successMessage, this.device.name, {duration: 2000});
        this.router.navigate(['/home/device/', this.device._id]);
      },
      error => {
        this.snackBar.open(error.message, this.device.name, {duration: 2000});
      }
    );
  }

  execute(command: any) {
    this.deviceService.executeCommand(this.device._id, command._id).subscribe(
      result => {
        this.snackBar.open("Successfully Executed!", command.name, { duration: 2000 });
      },
      error => {
        this.snackBar.open(error.message, command.name, { duration: 2000 });
      }
    );
  }

  newTransducer() {
    if (this.t_name != "" && this.t_unit != "") {
      var body = {
        name: this.t_name,
        unit: this.t_unit,
        is_actuable: this.t_actuable
      };
      this.deviceService.addTransducer(this.device._id, body).subscribe(
        result => {
          this.snackBar.open("New transducer added!", this.t_name, { duration: 2000 });
          this.t_name = "";
          this.t_unit = "";
          this.t_actuable = false;
          this.getDevice();
        },
        error => {
          this.snackBar.open(error.message, this.t_name, { duration: 2000 });
        }
      );
    }
    else {
      this.snackBar.open("Name / Unit cannot be empty!", "ERROR", { duration: 2000 });
    }
  }

  deleteTransducer(t_id: string, t_name: string) {
    this.deviceService.deleteTransducer(this.device._id, t_id).subscribe(
      result => {
        this.snackBar.open("Transducer Deleted!", t_name, { duration: 2000 });
        this.getDevice();
      },
      error => {
        this.snackBar.open(error.message, t_name, { duration: 2000 });
      }
    );
  }

  newCommand() {
    if (this.c_name && this.c_value && this.c_transducer) {
      var body = {
        name: this.c_name,
        transducer_id: this.c_transducer._id,
        value: this.c_value
      };
      this.deviceService.addCommand(this.device._id, body).subscribe(
        result => {
          this.snackBar.open("Command Added!", this.c_name, { duration: 2000 });
          this.c_name = "";
          this.c_transducer = null;
          this.c_value = "";
          this.getDevice();
        },
        error => {
          this.snackBar.open(error.message, this.c_name, { duration: 2000 });
        }
      );
    }
    else {
      this.snackBar.open("Name/Value/Transducer cannot be empty!", "ERROR", { duration: 2000 });
    }
  }

  deleteCommand(c_id: string, c_name: string) {
    this.deviceService.deleteCommand(this.device._id, c_id).subscribe(
      result => {
        this.snackBar.open("Command Deleted!", c_name, { duration: 2000 });
        this.getDevice();
      },
      error => {
        this.snackBar.open(error.message, c_name, { duration: 2000 });
      }
    );
  }

}