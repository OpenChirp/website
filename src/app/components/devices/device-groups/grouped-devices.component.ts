import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';
import { DeviceGroupService } from '../../../services/device-group.service';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';

import { SelectDeviceComponent } from '../../devices/select-device.component';

@Component({
	selector: 'grouped-devices',
	templateUrl: './grouped-devices.component.html',
	styleUrls: ['./grouped-devices.component.scss']
})

export class GroupedDevicesComponent {
	@Input() deviceGroup: Device;
	@Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
	devices: Array<any> = [];

	constructor(private route: ActivatedRoute,
		private router: Router,
    private deviceService: DeviceService,
		private deviceGroupService: DeviceGroupService,
		private successDialogService: SuccessDialogService,
		private errorDialogService: ErrorDialogService,
		public dialog: MatDialog) {
	}
	ngOnInit() {
		this.getGroupedDevices();
	}

  getGroupedDevices() {
    this.deviceGroupService.getGroupedDevices(this.deviceGroup._id).subscribe(
      result => this.devices = result,
      error => this.router.navigate(['/home'])
    );
	}

	addDeviceToGroup(device: any){
    this.deviceGroupService.addDeviceToGroup(this.deviceGroup._id, device._id).subscribe(
      result => {
        this.successDialogService.dialogPopup("Added device: " + device.name);
        this.getGroupedDevices();
      },
      error => {
        this.errorDialogService.dialogPopup(error.message + ': ' + device.name);
      }
    );
	}

  removeDevice(device_id: string, name: string) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Remove device from group : ' + name + '?';
    dialogRef.componentInstance.confirmText = 'Remove';
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceGroupService.deleteDeviceFromGroup(this.deviceGroup._id, device_id).subscribe(
            result => {
              this.successDialogService.dialogPopup('Removed from group :' + name);
              this.updateDevice.emit(true);
              for (let i = 0; i < this.devices.length; i++) {
                if (this.devices[i]._id == device_id) {
                  this.devices.splice(i, 1);
                }
              }
            },
            error => {
              this.errorDialogService.dialogPopup(error.message + ': ' + name);
            });
        }
      }
    );
  }

	selectDevice() {
		var dialogRef = this.dialog.open(SelectDeviceComponent, { width: '900px', height: '700px' });
		dialogRef.afterClosed().subscribe(
			result => {
				if(result) {
					this.addDeviceToGroup(result);
				}
			});
	}

}
