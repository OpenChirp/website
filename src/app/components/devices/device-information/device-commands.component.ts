import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../../../models/device';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';
import { DeviceService } from '../../../services/device.service';
import { UserService } from '../../../services/user.service';
import { MdDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';

@Component({
  selector: 'device-commands',
  templateUrl: './device-commands.component.html',
  styleUrls: ['./device-commands.component.scss']
})

export class DeviceCommandsComponent {
  @Input() device: Device;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
  name: string = "";
  value: string = "";
  transducer: any = null;
  
  constructor(private deviceService: DeviceService, 
              private userService: UserService,
              private successDialogService: SuccessDialogService, 
              private errorDialogService: ErrorDialogService,
              public dialog: MdDialog) {

  }

  newCommand() {
    if (this.name && this.value && this.transducer) {
      var body = {
        name: this.name,
        transducer_id: this.transducer._id,
        value: this.value
      };
      this.deviceService.addCommand(this.device._id, body).subscribe(
        result => {
          this.successDialogService
            .dialogPopup(SuccessDialogComponent, 'Command Added: ' + this.name);
          this.name = "";
          this.transducer = null;
          this.value = "";
          this.updateDevice.emit(true);
        },
        error => {
          this.errorDialogService
            .dialogPopup(ErrorDialogComponent, error.message + ': ' + this.name);
        }
      );
    } else {
      this.errorDialogService
        .dialogPopup(ErrorDialogComponent, 'Name/Value/Transducer cannot be empty!');
    }
  }

  deleteCommand(id: string, name: string) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = "Delete Command " + name + "?";
    dialogRef.componentInstance.confirmText = "Delete";
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceService.deleteCommand(this.device._id, id).subscribe(
            result => {
              this.successDialogService
                .dialogPopup(SuccessDialogComponent, 'Command Deleted: ' + name);
              this.updateDevice.emit(true);
            },
            error => {
              this.errorDialogService
                .dialogPopup(ErrorDialogComponent, error.message + ': ' + name);
            }
          );
        }
      }
    );
  }
 createShortcut(command : any){
   // if (this.name != "") {
      var body = {
        "name": command.name,
        "device_id": this.device._id,
        "command_id":command._id
      };
      this.userService
        .createCommandShort(body)
        .subscribe(
          result => {
            this.successDialogService
                .dialogPopup(SuccessDialogComponent, 'Shortcut created ' + this.name);
              
          },
          error => {
             this.errorDialogService
              .dialogPopup(ErrorDialogComponent, error.message );
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
          .dialogPopup(SuccessDialogComponent, 'Executed: ' + command.name);
      },
      error => {
        this.errorDialogService
          .dialogPopup(ErrorDialogComponent, error.message + ': ' + command.name);
      }
    );
  }
}