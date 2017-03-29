import { Component, Input } from '@angular/core';
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
  locationId = "";
  errorMessage = "";

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService) {

  }

  ngOnInit() {
    this.locationId = this.route.snapshot.params['id'];
    this.route.params.switchMap((params: Params) => params['id']).subscribe((lid: string) => console.log(lid));
    
    if (!this.isValidId(this.locationId)) {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.getDevices(this.locationId);
    }

  }

  // Check if location id is valid, and if there exist devices for the location
  isValidId(id: string) {
    return true;
  }

  getDevices(location_id: string) {
    this.devices = [];
    this.locationService.getDeviceByLocationId(location_id).subscribe(
      result => {
        for (var i = 0; i < result.length; i++) {
          this.devices.push(result[i]);
        }
      },
      error => this.errorMessage = error
    );
  }

}