import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Device } from '../resources/device';
import { Location } from '../resources/location';
import { LocationService } from '../resources/location.service';


@Component({
  selector: 'device-list',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.scss']
})

export class DeviceListComponent {
  devices: Array<Device> = [];
  errorMessage = "";
  location: Location = null;

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService) {

  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.locationService.getDeviceByLocationId(params['id']))
      .subscribe(
        result => {
          this.devices = result;
          if (this.devices.length == 0) {
            this.router.navigate(['/home']);
          }
        },
        error => this.router.navigate(['/home'])
      );
    this.route.params
      .switchMap((params: Params) => this.locationService.getLocationById(params['id']))
      .subscribe(
        result => this.location = result,
        error => this.errorMessage = error.message
      );
  }

  gotoDevice(id: string) {
    this.router.navigate(['/home/device/', id]);
  }

}