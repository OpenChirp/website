import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DeviceService } from '../../../services/device.service';
import { Device } from '../../../models/device';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { MdDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';

@Component({
  selector: 'device-transducers',
  templateUrl: './device-transducers.component.html',
  styleUrls: ['./device-transducers.component.scss']
})

export class DeviceTransducersComponent {
  @Input() device: Device;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
  name: string = "";
  unit: string = "";
  actuable: boolean = false;
  transducers: Array<Object>;
  publishPayload: string = "";
  lastUpdated: Date;
  nameSortDir: number = 0; // 0 (no sort), 1 (ascending), or 2 (descending)
  nameSortDirSymbol: string = "";

  constructor(private deviceService: DeviceService, 
              private successDialogService: SuccessDialogService, 
              private errorDialogService: ErrorDialogService,
              public dialog: MdDialog) {

  }

  // Helps sort the given array of transducers by their name
  // in ascending order.
  private cmpTransducersByNameAsc(a,b) {
    if (a.name < b.name)
       return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  // Helps sort the given array of transducers by their name
  // in descending over.
  private cmpTransducersByNameDes(a,b) {
    if (b.name < a.name)
       return -1;
    if (b.name > a.name)
      return 1;
    return 0;
  }

  private sortByNameUpdate() {
    if (this.nameSortDir == 0) {
      this.nameSortDirSymbol = '';
      this.transducers = this.device.transducers;
    } else {
      // We buffer the transducers separately so that we can sort
      // without disturbing the received order.
      this.nameSortDirSymbol = (this.nameSortDir==1)?'^':'v';
      var cmp = (this.nameSortDir==1)?
          this.cmpTransducersByNameAsc:
          this.cmpTransducersByNameDes;
      var tcopy = new Array<Object>();
      Object.assign(tcopy, this.device.transducers);
      tcopy.sort(cmp);
      this.transducers = tcopy;
    }
  }

  sortByNameToggle() {
    this.nameSortDir = (this.nameSortDir+1)%3;
    this.sortByNameUpdate()
  }

  ngOnInit() {
    this.getTransducers();
  }

  getTransducers() {
    this.deviceService.getDeviceTransducers(this.device._id).subscribe(
      out => {
        this.lastUpdated = new Date();
        this.device.transducers = out;
        this.sortByNameUpdate();
      });
  }

  newTransducer() {
    if (this.name != "" && this.unit != "") {
      var body = {
        name: this.name,
        unit: this.unit,
        is_actuable: this.actuable
      };
      this.deviceService.addTransducer(this.device._id, body).subscribe(
        result => {
          this.successDialogService
            .dialogPopup('New Transducer Added: ' + this.name);
          this.name = "";
          this.unit = "";
          this.actuable = false;
          this.updateDevice.emit(true);
        },
        error => {
          this.errorDialogService
            .dialogPopup(error.message + ': ' + this.name);
        }
      );
    } else {
      this.errorDialogService
        .dialogPopup('Name/Unit cannot be empty!');
    }
  }

  deleteTransducer(id: string, name: string) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.confirmText = "Delete";
    dialogRef.componentInstance.dialogText = "Delete Transducer " + name + "?";
    dialogRef.afterClosed().subscribe(
      result =>  {
        if (result) {
          this.deviceService.deleteTransducer(this.device._id, id).subscribe(
            result => {
              this.successDialogService
                .dialogPopup('Transducer Deleted: ' + name);
              this.updateDevice.emit(true);
            },
            error => {
              this.errorDialogService
                .dialogPopup(error.message + ': ' + name);
            }
          );
        }
      }
    );
  }

  publishToTransducer(t_id: string, t_name: string) {
    this.deviceService.publishToTransducer(this.device._id, t_id, this.publishPayload).subscribe(
      result => {
        this.successDialogService
          .dialogPopup('Published to : ' + t_name);
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message + ': ' + t_name);
      }
    );
  }
}