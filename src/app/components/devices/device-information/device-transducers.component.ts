import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DeviceService } from '../../../services/device.service';
import { DeviceGroupService } from '../../../services/device-group.service';
import { Device } from '../../../models/device';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';
import { InputTransducerValueComponent } from '../../dialogs/input-transducer-value.component';
import { interval ,  Subscription } from 'rxjs';
import { EditTransducerComponent } from './edit-transducer.component';

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
  groupedtransducers: Array<Object>;
  publishPayload: string = "";
  lastUpdated: Date;
  nameSortDir: number = 0; // 0 (no sort), 1 (ascending), or 2 (descending)
  nameSortDirSymbol: string = "";
  transducerAutoRefreshPeriod: number = 2000; // 2000 ms
  transducerAutoRefreshSub: Subscription;
  isDeviceGroup: boolean = false;

  constructor(private deviceService: DeviceService,
              private deviceGroupService: DeviceGroupService,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              public dialog: MatDialog) {

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
    if (this.isDeviceGroup) {
      this.getGroupTransducers();
    }
  }

  ngOnDestroy() {
    this.transducerAutoRefreshStop();
  }

  getTransducers() {
    this.deviceService.getDeviceTransducers(this.device._id).subscribe(
      out => {
        this.lastUpdated = new Date();
        this.device.transducers = out;
        this.sortByNameUpdate();
      });
  }

  getGroupTransducers() {
    this.deviceGroupService.getDeviceGroupTransducers(this.device._id).subscribe(
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
          this.getTransducers();
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

  editTransducer(transducer: any) {
    let dialogRef = this.dialog.open(EditTransducerComponent, { data: { transducer: transducer }});
    dialogRef.afterClosed().subscribe(
      result =>  {
        if (result) {
          this.deviceService.editTransducer(this.device._id, transducer._id, result).subscribe(
            result => {
              this.successDialogService
                .dialogPopup('Transducer Updated: ' + name);
              this.updateDevice.emit(true);
              this.getTransducers();
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
              this.getTransducers();
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

  publishTransducerValue(id: string, name: string, valueOriginal: string) {
    let dialogRef = this.dialog.open(InputTransducerValueComponent);
    dialogRef.componentInstance.transducerName = name;
    dialogRef.componentInstance.valueOriginal = valueOriginal;
    dialogRef.componentInstance.valueNew = "";
    dialogRef.afterClosed().subscribe(
      value =>  {
        if (value) {
          // Set POST
          this.deviceService.publishToTransducer(this.device._id, id, value).subscribe(
            result => {
              this.successDialogService
                .dialogPopup('Published ' + value + ' to ' + name);
              this.updateDevice.emit(true);
              this.getTransducers();
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

  // Start the interval timer that automatically refreshes the transducer values
  transducerAutoRefreshStart() {
    this.transducerAutoRefreshSub =
      interval(this.transducerAutoRefreshPeriod)
        .subscribe(val => this.getTransducers());
  }

  // Stop the interval timer that automatically refreshes the transducer values
  transducerAutoRefreshStop() {
    if (this.transducerAutoRefreshSub != null && !this.transducerAutoRefreshSub.closed) {
      this.transducerAutoRefreshSub.unsubscribe();
    }
  }
}
