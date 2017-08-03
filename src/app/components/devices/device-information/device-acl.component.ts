import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../../../models/device';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { DeviceService } from '../../../services/device.service';
import { UserService } from '../../../services/user.service';
import { MdDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';

@Component({
  selector: 'device-acl',
  templateUrl: './device-acl.component.html',
  styleUrls: ['./device-acl.component.scss']
})

export class DeviceAclComponent {
  @Input() device: Device;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();

  constructor(private deviceService: DeviceService, 
              private userService: UserService,
              private successDialogService: SuccessDialogService, 
              private errorDialogService: ErrorDialogService,
              public dialog: MdDialog
              ) {
  }

  
}