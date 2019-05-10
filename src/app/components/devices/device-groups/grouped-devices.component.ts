import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';
import { DeviceGroupService } from '../../../services/device-group.service';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { MatDialog, Sort, MatSort } from '@angular/material';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';

import { SelectDeviceComponent } from '../select-device.component';


@Component({
  selector: 'grouped-devices',
  templateUrl: './grouped-devices.component.html',
  styleUrls: ['./grouped-devices.component.scss']
})

export class GroupedDevicesComponent implements OnInit {
  @Input() deviceGroup: Device;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(MatSort) matSort: MatSort;
  devices: Array<any> = [];
  sortedData: Array<any> = [];
  prevSort: Sort = {
    active: 'name',
    direction: 'asc'
  };


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
    this.prevSort.direction = this.matSort.direction;
    this.prevSort.active = this.matSort.active;
    this.deviceGroupService.getGroupedDevices(this.deviceGroup._id).subscribe(
      result => {
        this.devices = result;
        this.sortedData = this.devices.slice();
        this.matSort.sort({
          id: this.prevSort.active,
          start: this.prevSort.direction as any,
          disableClear: true
        });
        // This is an ugly hack to get it sort programatically, until material fixes this behavior
        const activeSortHeader = this.matSort.sortables.get(this.prevSort.active);
        if (activeSortHeader) {
          activeSortHeader['_setAnimationTransitionState']({
            fromState: this.prevSort.direction,
            toState: 'active',
          });
          this.matSort.sort({
            id: this.prevSort.active,
            start: this.prevSort.direction as any,
            disableClear: true
          });
        }
      },
      error => this.router.navigate(['/home'])
    );
  }

  gotoDevice(id: string) {
    this.router.navigate(['/home/device/', id]);
  }

  addDeviceToGroup(device: any) {
    this.deviceGroupService.addDeviceToGroup(this.deviceGroup._id, device._id).subscribe(
      result => {
        this.successDialogService.dialogPopup('Added device: ' + device.name);
        this.getGroupedDevices();
      },
      error => {
        this.errorDialogService.dialogPopup(error.message + ': ' + device.name);
      }
    );
  }

  removeDevice(device_id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Remove device from group : ' + name + '?';
    dialogRef.componentInstance.confirmText = 'Remove';
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceGroupService.deleteDeviceFromGroup(this.deviceGroup._id, device_id).subscribe(
            result => {
              this.successDialogService.dialogPopup('Removed from group :' + name);
              this.getGroupedDevices();
            },
            error => {
              this.errorDialogService.dialogPopup(error.message + ': ' + name);
            });
        }
      }
    )
  }

  selectDevice() {
    const dialogRef = this.dialog.open(SelectDeviceComponent, { width: '900px', height: '700px' });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.addDeviceToGroup(result);
        }
      })
  }

  sortData(sort: Sort) {
    const data = this.devices.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'owner': return this.compareNameProp(a.owner, b.owner, isAsc);
        case 'location': return this.compareNameProp(a.location_id, b.location_id, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string , b: number | string , isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  compareNameProp(a: any, b: any, isAsc: boolean) {
    let result;
    if (a == null) {
      result = -1 ;
    } else if (b == null) {
      result = 1;
    } else {
      result = (a.name.toUpperCase()  < b.name.toUpperCase()  ? -1 : 1);
    }
    return result *   (isAsc ? 1 : -1);
  }
}

