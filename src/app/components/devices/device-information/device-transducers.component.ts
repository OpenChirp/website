import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DeviceService } from '../../../services/device.service';
import { Device } from '../../../models/device';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';


@Component({
  selector: 'device-transducers',
  templateUrl: './device-transducers.component.html',
  styleUrls: ['./device-transducers.component.scss']
})

export class DeviceTransducersComponent {
  @Input() device: Device;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
  name: string = "";
  unit: string = "";
  actuable: boolean = false;
  publishPayload: string = "";

  constructor(private deviceService: DeviceService, private successDialogService: SuccessDialogService, private errorDialogService: ErrorDialogService) {

  }

  newTransducer() {
    if (this.name != "" && this.unit != "") {
      var body = {
        name: this.name,
        unit: this.unit,
        is_actuable: this.actuable
      };
      this.deviceService.addTransducer(this.device._id, body).subscribe(
        result => {
          this.successDialogService
            .dialogPopup(SuccessDialogComponent, 'New Transducer Added: ' + this.name);
          this.name = "";
          this.unit = "";
          this.actuable = false;
          this.updateDevice.emit(true);
        },
        error => {
          this.errorDialogService
            .dialogPopup(ErrorDialogComponent, error.message + ': ' + this.name);
        }
      );
    } else {
      this.errorDialogService
        .dialogPopup(ErrorDialogComponent, 'Name/Unit cannot be empty!');
    }
  }

  deleteTransducer(id: string, name: string) {
    this.deviceService.deleteTransducer(this.device._id, id).subscribe(
      result => {
        this.successDialogService
          .dialogPopup(SuccessDialogComponent, 'Transducer Deleted: ' + name);
        this.updateDevice.emit(true);
      },
      error => {
        this.errorDialogService
          .dialogPopup(ErrorDialogComponent, error.message + ': ' + name);
      }
    );
  }

  publishToTransducer(t_id: string, t_name: string) {
    this.deviceService.publishToTransducer(this.device._id, t_id, this.publishPayload).subscribe(
      result => {
        this.successDialogService
          .dialogPopup(SuccessDialogComponent, 'Published to : ' + t_name);
        this.updateDevice.emit(true);
      },
      error => {
        this.errorDialogService
          .dialogPopup(ErrorDialogComponent, error.message + ': ' + t_name);
      }
    );
  }
}