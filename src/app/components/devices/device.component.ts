import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar, MdMenuModule, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/operator/switchMap';

import { Device } from '../../models/device';
import { DeviceService } from '../../services/device.service';
import { DialogService } from '../../services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'device-info',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DeviceComponent {
  device: Device = null;
  errorMessage: string = "";
  successMessage: string = "";
  deviceTypes: Array<string> = ["LORA", "TWIST", "FIREFLY", "BOSCH_XDK"];
  services: Array<Object> = [];

  // New Transducer
  t_name: string = "";
  t_unit: string = "";
  t_actuable: boolean = false;
  t_publishPayload: string = "";

  // New Command
  c_name: string = "";
  c_value: string = "";
  c_transducer: any = null;

  // Configs for snackbar notifications
  successConfig = new MdSnackBarConfig();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private deviceService: DeviceService,
              public snackBar: MdSnackBar,
              private dialogService: DialogService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.getDevice();
  }

  saveTemplate() {
    this.router.navigate(['/home/newtemplate/', this.device._id]);
  }

  getDevice() {
    this.route.params
      .switchMap((params: Params) => this.deviceService.getDeviceById(params['id']))
      .subscribe(
        result => {
          this.device = result;
          var serviceIds = this.device.linked_services.map((x: any) => x.service_id);
          for (var i = 0; i < serviceIds.length; i++) {
            this.userService.getServiceByID(serviceIds[i]).subscribe(
              res => this.services.push(res)
            );
          }
        },
        error => this.router.navigate(['/home'])
      );
  }

  deleteDevice() {
    this.successConfig.duration = 3000;
    this.successConfig.extraClasses = ['success'];

    if (this.device) {
      this.deviceService.deleteDevice(this.device._id).subscribe(
        result => {
          this.snackBar.open('Successfully Deleted!', this.device.name, this.successConfig);
          this.router.navigate(['/home']);
        },
        error => this.dialogService
                  .dialogPopup(ErrorDialogComponent, error.message + ': ' + this.device.name)
      );
    }
  }

  updateDevice() {
    this.successConfig.duration = 3000;
    this.successConfig.extraClasses = ['success'];

    this.deviceService.updateDeviceById(this.device._id, this.device).subscribe(
      result => {
        this.successMessage = 'Updated: ';
        this.snackBar.open(this.successMessage, this.device.name, this.successConfig);
        this.router.navigate(['/home/device/', this.device._id]);
      },
      error => {
        this.dialogService
          .dialogPopup(ErrorDialogComponent, error.message + ': ' + this.device.name);
      }
    );
  }

  execute(command: any) {
    this.successConfig.duration = 3000;
    this.successConfig.extraClasses = ['success'];

    this.deviceService.executeCommand(this.device._id, command._id).subscribe(
      result => {
        this.snackBar.open('Executed: ', command.name, this.successConfig);
      },
      error => {
        this.dialogService
          .dialogPopup(ErrorDialogComponent, error.message + ': ' + command.name);
      }
    );
  }

  newTransducer() {
    this.successConfig.duration = 3000;
    this.successConfig.extraClasses = ['success'];

    if (this.t_name != "" && this.t_unit != "") {
      var body = {
        name: this.t_name,
        unit: this.t_unit,
        is_actuable: this.t_actuable
      };
      this.deviceService.addTransducer(this.device._id, body).subscribe(
        result => {
          this.snackBar.open('New Transducer added: ', this.t_name, this.successConfig);
          this.t_name = "";
          this.t_unit = "";
          this.t_actuable = false;
          this.getDevice();
        },
        error => {
          this.dialogService
            .dialogPopup(ErrorDialogComponent, error.message + ': ' + this.t_name);
        }
      );
    } else {
      this.dialogService
        .dialogPopup(ErrorDialogComponent, 'Name/Unit cannot be empty!');
    }
  }
   publishToTransducer(t_id: string, t_name: string) {
       
    this.deviceService.publishToTransducer(this.device._id, t_id, this.t_publishPayload).subscribe(
      result => {
        this.dialogService
          .dialogPopup(SuccessDialogComponent, 'Published to : ' + t_name);
        this.getDevice();
      },
      error => {
        this.dialogService
          .dialogPopup(ErrorDialogComponent, error.message + ': ' + t_name);
      }
    );
  }

  deleteTransducer(t_id: string, t_name: string) {
    this.successConfig.duration = 3000;
    this.successConfig.extraClasses = ['success'];

    this.deviceService.deleteTransducer(this.device._id, t_id).subscribe(
      result => {
        this.snackBar.open('Transducer Deleted: ', t_name, this.successConfig);
        this.getDevice();
      },
      error => {
        this.dialogService
          .dialogPopup(ErrorDialogComponent, error.message + ': ' + t_name);
      }
    );
  }

  newCommand() {
    this.successConfig.duration = 3000;
    this.successConfig.extraClasses = ['success'];

    if (this.c_name && this.c_value && this.c_transducer) {
      var body = {
        name: this.c_name,
        transducer_id: this.c_transducer._id,
        value: this.c_value
      };
      this.deviceService.addCommand(this.device._id, body).subscribe(
        result => {
          this.snackBar.open('Command Added: ', this.c_name, this.successConfig);
          this.c_name = "";
          this.c_transducer = null;
          this.c_value = "";
          this.getDevice();
        },
        error => {
          this.dialogService
            .dialogPopup(ErrorDialogComponent, error.message + ': ' + this.c_name);
        }
      );
    } else {
      this.dialogService
        .dialogPopup(ErrorDialogComponent, 'Name/Value/Transducer cannot be empty!');
    }
  }

  deleteCommand(c_id: string, c_name: string) {
    this.successConfig.duration = 3000;
    this.successConfig.extraClasses = ['success'];

    this.deviceService.deleteCommand(this.device._id, c_id).subscribe(
      result => {
        this.snackBar.open('Command Deleted: ', c_name, this.successConfig);
        this.getDevice();
      },
      error => {
        this.dialogService
          .dialogPopup(ErrorDialogComponent, error.message + ': ' + c_name);
      }
    );
  }

  toService(id: string) {
    this.router.navigate(['/home/service/', id]);
  }

}
