import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import {AdminService} from '../../../services/admin.service';
import {ErrorDialogService} from '../../../services/error-dialog.service';
import {Sort} from '@angular/material';

@Component({
  selector: 'admin-devicelist',
  templateUrl: './admin-devicelist.component.html',
  styleUrls: ['./admin-devicelist.component.scss']
})

export class AdminDeviceListComponent implements OnInit {
  devices: Array<any> = [];
  searchTerm = '';
  errorMessage = '';
  sortedData: Array<any> = [];

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
        this.sortedData = this.devices.slice();
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
      return this.sortedData.filter((x) => {
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
      return this.sortedData;
    }
  }
  sortData(sort: Sort) {
    const data = this.sortedData.slice();
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
