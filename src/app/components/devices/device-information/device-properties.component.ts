import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { SuccessDialogService } from '../../../services/success-dialog.service';

import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';

@Component({
  selector: 'device-properties',
  templateUrl: './device-properties.component.html',
  styleUrls: ['./device-properties.component.scss']
})

export class DevicePropertiesComponent {
  @Input() device: Device;
  deviceTypes: Array<string> = ["LORA", "TWIST", "FIREFLY", "BOSCH_XDK"];

  constructor(private deviceService: DeviceService, private router: Router, private successDialogService: SuccessDialogService, private errorDialogService: ErrorDialogService) {

  }

  updateDevice() {
    this.deviceService.updateDeviceById(this.device._id, this.device).subscribe(
      result => {
        this.successDialogService
          .dialogPopup(SuccessDialogComponent, "Updated: " + this.device.name);
      },
      error => {
        this.errorDialogService
          .dialogPopup(ErrorDialogComponent, error.message + ': ' + this.device.name);
      }
    );
  }
}