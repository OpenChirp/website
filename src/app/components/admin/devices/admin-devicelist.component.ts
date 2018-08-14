import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Device } from '../../../models/device';
import {AdminService} from '../../../services/admin.service';
import {ErrorDialogService} from '../../../services/error-dialog.service';

@Component({
  selector: 'admin-devicelist',
  templateUrl: './admin-devicelist.component.html',
  styleUrls: ['./admin-devicelist.component.scss']
})

export class AdminDeviceListComponent {
  devices: Array<any> = [];
  searchTerm: string = '';
  errorMessage = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminService: AdminService,
              private errorDialogService: ErrorDialogService
  ) {

  }

  ngOnInit() {
    this.getAllDevices();
  }

  getAllDevices() {
    this.adminService.getAllDevices().subscribe(
      result => {
        this.devices = result;
        },
      error => {
        this.errorDialogService
          .dialogPopup(error.message);
      });
  }
  gotoDevice(id: string) {
    this.router.navigate(['/home/device/', id]);
  }

  filtered() {
    if (this.searchTerm !== '') {
      return this.devices.filter((x) => {
        if (typeof(x.name) === 'string') {
        // if (typeof(x.name) == "string" && typeof(x.description == "string") && typeof(x.owner == "string")) {
          let device_name: string = x.name;
          let name_match = device_name.toLowerCase().includes(this.searchTerm.toLowerCase());
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
              let device_owner: string = x.owner.name;
              owner_match = device_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
            }
            else {
              let device_owner: string = x.owner.email;
              owner_match = device_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
            }
            if (owner_match) return true;
          }
        }
        return false;
      });
    } else {
      return this.devices;
    }
  }
}
