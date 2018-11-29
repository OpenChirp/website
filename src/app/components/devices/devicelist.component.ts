
import {switchMap} from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Device } from '../../models/device';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';


@Component({
  selector: 'device-list',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.scss']
})

export class DeviceListComponent {
  devices: Array<Device> = [];
  devicegroups: Array<Device> = [];
  errorMessage = "";
  location: Location = null;

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService) {

  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => this.locationService.getDeviceByLocationId(params['id'])))
      .subscribe(
        result => {
          this.devices = result;
        },
        error => this.router.navigate(['/home'])
      );
    this.route.params.pipe(
      switchMap((params: Params) => this.locationService.getDeviceGroupByLocationId(params['id'])))
      .subscribe(
        result => {
          this.devicegroups = result;
        },
        error => this.router.navigate(['/home'])
      );
    this.route.params.pipe(
      switchMap((params: Params) => this.locationService.getLocationById(params['id'])))
      .subscribe(
        result => this.location = result,
        error => this.errorMessage = error.message
      );
  }

  gotoDevice(id: string) {
    this.router.navigate(['/home/device/', id]);
  }

  newDevice() {
    if (this.location != null) {
      this.router.navigate(['/home/newdevice', { location_id: this.location._id }]);
    }
  }
  newDeviceGroup() {
    if (this.location != null) {
      this.router.navigate(['/home/newdevice', { location_id: this.location._id }]);
    }
  }
}
