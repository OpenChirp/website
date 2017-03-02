import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../rest/location.service';
import { Location } from '../rest/location';
import { Device } from '../rest/device';

@Component({
  selector: 'tree-node',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeNodeComponent {
  @Input() currentLocation: Location;
  childLocations: Array<Location> = [];
  errorMesssage: string;
  devices: Array<Device> = [];

  constructor(private locationService: LocationService) {
      
  }

  getChildren(curLocation: Location) {
    let children = curLocation.children;
    if (this.childLocations.length == 0) {
      this.childLocations = [];
      for (var i = 0; i < children.length; i++) {
        this.locationService
          .getLocationById(children[i])
          .subscribe(
            result => this.childLocations.push(result),
            error => this.errorMesssage = error
          );
      }
    }
    this.locationService.getDeviceByLocationId(curLocation._id).subscribe(
      result => {
        for (var i = 0; i < result.length; i++) {
          var device = result[i];
          this.devices.push(device);
        }
      },
      error => this.errorMesssage = error
    );
  }

  clearChildren() {
    this.childLocations = [];
    this.devices = [];
  }
}