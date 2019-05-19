import {Component, EventEmitter, Inject, Input, OnChanges, Output} from '@angular/core';
import {Device} from '../../../models/device';
import {ErrorDialogService} from '../../../services/error-dialog.service';
import {SuccessDialogService} from '../../../services/success-dialog.service';
import {DeviceService} from '../../../services/device.service';
import {DeviceGroupService} from '../../../services/device-group.service';
import {UserService} from '../../../services/user.service';
import {MatDialog, Sort} from '@angular/material';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog.component';
import {PublicLinkComponent} from '../../publiclink/public-link.component';
import {Configuration} from '../../../config';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'device-commands',
  templateUrl: './device-commands.component.html',
  styleUrls: ['./device-commands.component.scss']
})

export class DeviceCommandsComponent implements OnChanges {
  @Input() device: Device;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
  name = '';
  value = '';
  bname = '';
  bvalue = '';
  transducer: any = null;
  broadcastTransducer: any = null;
  baseUrl: string;
  sortedData: Array<any> = [];
  sortedBroadcastData: Array<any> = [];

  constructor(private deviceService: DeviceService,
              private deviceGroupService: DeviceGroupService,
              private userService: UserService,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              public dialog: MatDialog,
              private config: Configuration,
              @Inject(DOCUMENT) document: any
  ) {

    this.baseUrl = document.location.origin + '/';
  }

  ngOnChanges() {
    this.sortedData = this.device.commands.slice();
    if (this.device.isDeviceGroup) {
      this.sortedBroadcastData = this.device.broadcast_commands.slice();
    }
  }

  transducerNameById(transducerID: string): string {
    for (const t of this.device.transducers) {
      const trans: any = t; // break typescript
      if (trans._id === transducerID) {
        return trans.name;
      }
    }
    return '';
  }

  broadcastTransducerNameById(transducerID: string): string {
    for (const t of this.device.broadcast_transducers) {
      const trans: any = t; // break typescript
      if (trans._id === transducerID) {
        return trans.name;
      }
    }
    return '';
  }

  newCommand() {
    if (this.name && this.value && this.transducer) {
      const body = {
        name: this.name,
        transducer_id: this.transducer._id,
        value: this.value
      };
      this.deviceService.addCommand(this.device._id, body).subscribe(
        result => {
          this.successDialogService
            .dialogPopup('Command Added: ' + this.name);
          this.name = '';
          this.transducer = null;
          this.value = '';
          this.updateDevice.emit(true);
        },
        error => {
          this.errorDialogService
            .dialogPopup(error.message + ': ' + this.name);
        }
      );
    } else {
      this.errorDialogService
        .dialogPopup('Name/Value/Transducer cannot be empty!');
    }
  }

  newBroadcastCommand() {
    if (this.bname && this.bvalue && this.broadcastTransducer) {
      const body = {
        name: this.bname,
        transducer_id: this.broadcastTransducer._id,
        value: this.bvalue
      };
      this.deviceGroupService.addBroadcastCommand(this.device._id, body).subscribe(
        result => {
          this.successDialogService
            .dialogPopup('Broadcast Command Added: ' + this.bname);
          this.bname = '';
          this.broadcastTransducer = null;
          this.bvalue = '';
          this.updateDevice.emit(true);
        },
        error => {
          this.errorDialogService
            .dialogPopup(error.message + ': ' + this.bname);
        }
      );
    } else {
      this.errorDialogService
        .dialogPopup('Name/Value/Transducer cannot be empty!');
    }
  }

  deleteCommand(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Delete Command ' + name + '?';
    dialogRef.componentInstance.confirmText = 'Delete';
    dialogRef.afterClosed().subscribe(
      closedResult => {
        if (closedResult) {
          this.deviceService.deleteCommand(this.device._id, id).subscribe(
            result => {
              this.successDialogService
                .dialogPopup('Command Deleted: ' + name);
              this.updateDevice.emit(true);
            },
            error => {
              this.errorDialogService
                .dialogPopup(error.message + ': ' + name);
            });
        }
      });
  }

  deleteBroadcastCommand(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Delete Broadcast Command ' + name + '?';
    dialogRef.componentInstance.confirmText = 'Delete';
    dialogRef.afterClosed().subscribe(
      closedResult => {
        if (closedResult) {
          this.deviceGroupService.deleteBroadcastCommand(this.device._id, id).subscribe(
            result => {
              this.successDialogService
                .dialogPopup('Broadcast Command Deleted: ' + name);
              this.updateDevice.emit(true);
            },
            error => {
              this.errorDialogService
                .dialogPopup(error.message + ': ' + name);
            });
        }
      });
  }

  publicLink(command: any) {
    this.deviceService.getPublicLink(this.device._id, command._id).subscribe(
      result => {
        const dialogRef = this.dialog.open(PublicLinkComponent, {width: '800px'});
        dialogRef.componentInstance.device = this.device;
        dialogRef.componentInstance.command = command;
        dialogRef.componentInstance.link = this.baseUrl + result;
        dialogRef.componentInstance.baseUrl = this.baseUrl;
      },
      error => {
        if (error.status === 404) {
          const dialogRef = this.dialog.open(PublicLinkComponent, {width: '800px'});
          dialogRef.componentInstance.device = this.device;
          dialogRef.componentInstance.command = command;
          dialogRef.componentInstance.baseUrl = this.baseUrl;
        } else {
          this.errorDialogService
            .dialogPopup(error.message);
        }
      });
  }

  publicBroadcastLink(command: any) {
    this.deviceGroupService.getPublicBroadcastLink(this.device._id, command._id).subscribe(
      result => {
        const dialogRef = this.dialog.open(PublicLinkComponent, {width: '800px'});
        dialogRef.componentInstance.device = this.device;
        dialogRef.componentInstance.command = command;
        dialogRef.componentInstance.link = this.baseUrl + result;
        dialogRef.componentInstance.baseUrl = this.baseUrl;
        dialogRef.componentInstance.isBroadcast = true;
      },
      error => {
        if (error.status === 404) {
          const dialogRef = this.dialog.open(PublicLinkComponent, {width: '800px'});
          dialogRef.componentInstance.device = this.device;
          dialogRef.componentInstance.command = command;
          dialogRef.componentInstance.baseUrl = this.baseUrl;
          dialogRef.componentInstance.isBroadcast = true;
        } else {
          this.errorDialogService
            .dialogPopup(error.message);
        }
      });
  }

  createShortcut(command: any) {
    // if (this.name != "") {
    const body = {
      'name': command.name,
      'device_id': this.device._id,
      'command_id': command._id
    };
    this.userService
      .createCommandShort(body)
      .subscribe(
        result => {
          this.successDialogService
            .dialogPopup('Shortcut created ' + this.name);

        },
        error => {
          this.errorDialogService
            .dialogPopup(error.message);
        }
      );
    /* }else {
       let errorMessage = 'Name  cannot be empty.';
       this.errorDialogService
         .dialogPopup(ErrorDialogComponent, errorMessage);
     }*/
  }

  execute(command: any) {
    this.deviceService.executeCommand(this.device._id, command._id).subscribe(
      result => {
        this.successDialogService
          .dialogPopup('Executed: ' + command.name);
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message + ': ' + command.name);
      }
    );
  }

  executeBroadcast(command: any) {
    this.deviceGroupService.executeBroadcastCommand(this.device._id, command._id).subscribe(
      result => {
        this.successDialogService
          .dialogPopup('Executed: ' + command.name);
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message + ': ' + command.name);
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.device.commands.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortBroadcastCommands(sort: Sort) {
    const data = this.device.broadcast_commands.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedBroadcastData = data;
      return;
    }
    this.sortedBroadcastData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }
}
