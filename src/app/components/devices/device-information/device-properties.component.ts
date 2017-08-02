import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { PropertiesComponent } from '../../dialogs/properties.component';

@Component({
  selector: 'device-properties',
  templateUrl: './device-properties.component.html',
  styleUrls: ['./device-properties.component.scss']
})

export class DevicePropertiesComponent {
  @Input() device: Device;
  @Input() acl: any;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
  tokenTip : string = "Use the device id as username and this token as password to authenticate over basic auth for REST API and MQTT. Make sure to copy it now. You won’t be able to see it again!";
 
  constructor(private deviceService: DeviceService, 
    private router: Router, 
    private successDialogService: SuccessDialogService, 
    private errorDialogService: ErrorDialogService,
    public dialog: MdDialog
   ) {
  }


  updateDeviceMeta() {
    this.deviceService.updateDeviceById(this.device._id, this.device).subscribe(
      result => {
        this.successDialogService
        .dialogPopup("Updated: " + this.device.name);
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message + ': ' + this.device.name);
      }
      );
  }

  createDeviceToken() {
    this.deviceService.createToken(this.device._id).subscribe(
      result => {
        this.updateDevice.emit(true);
        this.successDialogService
        .dialogPopupNoAutoClose("Token : " + result, this.tokenTip);
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message + ': ' + this.device.name);
      }
      );
  }

  recreateDeviceToken() {  
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = "Regenerate token for " + this.device.name + "? ";
    dialogRef.componentInstance.dialogWarning = "This will over-write the previous token."
    dialogRef.componentInstance.confirmText = "Generate";
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceService.recreateToken(this.device._id).subscribe(
            result => {
              this.updateDevice.emit(true);
              this.successDialogService
              .dialogPopupNoAutoClose("Token : " + result, this.tokenTip); 
            },
            error => this.errorDialogService
            .dialogPopup(error.message + ': ' + this.device.name)
            );
        } // End if
      } // End result
      ); // End subscribe
  } // End function
  
  deleteDeviceToken() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = "Delete token for device " + this.device.name + "? ";
    dialogRef.componentInstance.dialogWarning = "The token will no longer work for authentication over REST and MQTT."
    dialogRef.componentInstance.confirmText = "Delete";
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceService.deleteToken(this.device._id).subscribe(
            result => {
              this.updateDevice.emit(true);
              this.successDialogService
              .dialogPopup('Successfully deleted token for: ' + this.device.name);               
            },
            error => this.errorDialogService
            .dialogPopup(error.message + ': ' + this.device.name)
            );// End delete token subscribe.
        } // End if
      } // End result
      ); // End subscribe    
  } // End function

  viewProperties() {
    let dialogRef = this.dialog.open(PropertiesComponent, { width: '600px' });
    dialogRef.componentInstance.properties = this.device.properties || {};
    dialogRef.componentInstance.source = this.device.name;
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          var newDevice = this.device;
          newDevice.properties = result;
          this.deviceService.updateDeviceById(this.device._id, newDevice).subscribe(
            res => this.successDialogService.dialogPopup("Updated Device: " + this.device.name),
            err => this.errorDialogService.dialogPopup(err.message)
            );
        }
      }
      );
  }



}