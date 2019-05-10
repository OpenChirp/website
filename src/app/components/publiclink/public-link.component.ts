import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {DeviceService} from '../../services/device.service';
import {DeviceGroupService} from '../../services/device-group.service';
import {ErrorDialogService} from '../../services/error-dialog.service';

@Component({
  selector: 'public-link',
  templateUrl: './public-link.component.html',
  styleUrls: ['./public-link.component.scss']
})

export class PublicLinkComponent {

  device: any;
  command: any;
  link: string;
  baseUrl: string;
  isBroadcast: boolean;

  constructor(private deviceService: DeviceService,
              private deviceGroupService: DeviceGroupService,
              public dialog: MatDialogRef<PublicLinkComponent>,
              private errorDialogService: ErrorDialogService) {
  }

  createPublicLink() {
    this.deviceService.createPublicLink(this.device._id, this.command._id).subscribe(
      result => {
        this.link = this.baseUrl + result;
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message);
      });
  }

  createPublicBroadcastLink() {
    this.deviceGroupService.createPublicBroadcastLink(this.device._id, this.command._id).subscribe(
      result => {
        this.link = this.baseUrl + result;
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message);
      });
  }

  close() {
    this.dialog.close();
  }
}
