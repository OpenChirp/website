import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { DeviceService } from '../../services/device.service'
import {ErrorDialogService} from '../../services/error-dialog.service';

@Component({
  selector: 'select-device',
  templateUrl: 'select-device.component.html',
  styleUrls: ['select-device.component.scss']
})

export class SelectDeviceComponent {
  devices: Array<any> = [];
  searchTerm = '';

  constructor(private router: Router,
              private deviceService: DeviceService,
              public dialogRef: MatDialogRef<SelectDeviceComponent>,
              private errorDialogService: ErrorDialogService) {

  }

  ngOnInit() {
    this.getAllDevices();
  }

  getAllDevices() {
    this.deviceService.getAllDevices().subscribe(
      result => {
        this.devices = result;
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message);
      });
  }
  select(device: any) {
    this.dialogRef.close(device);
  }

  filtered() {
    if (this.searchTerm !== '') {
      return this.devices.filter((x) => {
        if (typeof(x.name) === 'string') {
          // if (typeof(x.name) == "string" && typeof(x.description == "string") && typeof(x.owner == "string")) {
          const device_name: string = x.name;
          const name_match = device_name.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (name_match) { return true; }
          let owner_match = false;

          /* @todo other fields as returned in future
          if(x.description){
            var device_description: string = x.description;
            var description_match = device_description.toLowerCase().includes(this.searchTerm.toLowerCase());
            if (description_match) return true;
          } */
          if (x.owner) {
            if (x.owner.name) {
              const device_owner: string = x.owner.name;
              owner_match = device_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
            } else {
              const device_owner: string = x.owner.email;
              owner_match = device_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
            }
            if (owner_match) { return true; }
          }
        }
        return false;
      });
    } else {
      return this.devices;
    }
  }
}
