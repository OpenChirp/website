import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material';
import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { PropertiesComponent } from '../../dialogs/properties.component';
import { SelectLocationComponent } from '../../locations/select-location.component';

@Component({
  selector: 'device-properties',
  templateUrl: './device-properties.component.html',
  styleUrls: ['./device-properties.component.scss']
})

export class DevicePropertiesComponent {
  @Input() device: Device;
  @Input() acl: any;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();

  constructor(private deviceService: DeviceService,
    private router: Router,
    private successDialogService: SuccessDialogService,
    private errorDialogService: ErrorDialogService,
    public dialog: MatDialog) {
  }

  updateDeviceMeta() {
    this.deviceService.updateDeviceById(this.device._id, this.device).subscribe(
      result => {
        this.successDialogService
        .dialogPopup('Updated: ' + this.device.name);
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message + ': ' + this.device.name);
      }
      );
  }


  viewProperties() {
    const dialogRef = this.dialog.open(PropertiesComponent, { width: '600px' });
    dialogRef.componentInstance.properties = this.device.properties || {};
    dialogRef.componentInstance.source = this.device.name;
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          const newDevice = this.device;
          newDevice.properties = result;
          this.deviceService.updateDeviceById(this.device._id, newDevice).subscribe(
            res => this.successDialogService.dialogPopup('Updated Device: ' + this.device.name),
            err => this.errorDialogService.dialogPopup(err.message)
            );
        }
      }
      );
  }

  gotoLocation() {
    if (this.device.location_id) {
      this.router.navigate(['/home/devices/', this.device.location_id]);
    }
  }

  pickLocation() {
    const dialogRef = this.dialog.open(SelectLocationComponent, { width: '800px', height: '700px' });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceService.updateDeviceById(this.device._id, { location_id: result }).subscribe(
            result => {
              this.successDialogService
                .dialogPopup('Updated: ' + this.device.name);
            },
            error => {
              this.errorDialogService
                .dialogPopup(error.message + ': ' + this.device.name);
            }
          );
        }
     });
  }
}
