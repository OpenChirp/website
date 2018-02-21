import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../../../models/device';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { DeviceService } from '../../../services/device.service';
import { UserService } from '../../../services/user.service';
import { MdDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';
import { PublicLinkComponent } from '../../publiclink/public-link.component';
import { Configuration } from '../../../config';

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
  baseUrl: string;

  constructor(private deviceService: DeviceService, 
              private userService: UserService,
              private successDialogService: SuccessDialogService, 
              private errorDialogService: ErrorDialogService,
              public dialog: MdDialog,
              private config: Configuration
              ) {

    this.baseUrl = config.base_url;
  }

  transducerNameById(transducerID: string): string {
    for (let t of this.device.transducers) {
      const trans:any = t; // break typescript
      if (trans._id == transducerID) {
        return trans.name;
      }
    }
    return '';
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
            .dialogPopup('Command Added: ' + this.name);
          this.name = "";
          this.transducer = null;
          this.value = "";
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

  publicLink(command: any) {
    this.deviceService.getPublicLink(this.device._id, command._id).subscribe(
      result => {      
        let dialogRef = this.dialog.open(PublicLinkComponent, { width: '800px' });
        dialogRef.componentInstance.device = this.device;
        dialogRef.componentInstance.command = command;
        dialogRef.componentInstance.link = this.baseUrl+ result;
        dialogRef.componentInstance.baseUrl = this.baseUrl; 
      },
      error => {
        if(error.status == 404){
          let dialogRef = this.dialog.open(PublicLinkComponent, { width: '800px' });
          dialogRef.componentInstance.device = this.device;
          dialogRef.componentInstance.command = command;
          dialogRef.componentInstance.baseUrl = this.baseUrl; 
        }else{
          this.errorDialogService
          .dialogPopup(error.message);
        }
      });
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
                .dialogPopup('Shortcut created ' + this.name);
              
          },
          error => {
             this.errorDialogService
              .dialogPopup(error.message );
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
}