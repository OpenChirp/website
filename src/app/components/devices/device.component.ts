import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import 'rxjs/add/operator/switchMap';

import { Device } from '../../models/device';
import { DeviceService } from '../../services/device.service';
import { SuccessDialogService } from '../../services/success-dialog.service';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog.component';
import { UserService } from '../../services/user.service';
import { ErrorDialogService } from '../../services/error-dialog.service';

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
  services: Array<Object> = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private deviceService: DeviceService,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              private userService: UserService,
              public dialog: MdDialog) {

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
          //TODO: Fix the hackish code below
          var serviceIds = this.device.linked_services.map((x: any) => x.service_id);          
              /*for (var i = 0; i < serviceIds.length; i++) {
                this.infraService.getServiceByID(serviceIds[i]).subscribe(
                  res => this.services.push(res)
              );
            } */    
        },
        error => this.router.navigate(['/home'])
      );
  }

  deleteDevice() {
    if (this.device) {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.componentInstance.dialogText = "Delete Device " + this.device.name + "?";
      dialogRef.componentInstance.confirmText = "Delete";
      dialogRef.afterClosed().subscribe(
        result => {
          if (result) {
            this.deviceService.deleteDevice(this.device._id).subscribe(
              result => {
                this.successDialogService
                  .dialogPopup('Successfully deleted: ' + this.device.name);
                this.router.navigate(['/home/mydevices']);
              },
              error => this.errorDialogService
                        .dialogPopup(error.message + ': ' + this.device.name)
            ); // End Delete Device Subscribe
          } // End if
        } // End result
      ); // End subscribe
    } // End if device
  } // End function

}
