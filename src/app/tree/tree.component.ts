import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { LocationService } from '../resources/location.service';
import { Location } from '../resources/location';
import { Device } from '../resources/device';

@Component({
  selector: 'tree-node',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeNodeComponent {
  @Input() currentLocation: Location;
  @Output() change: EventEmitter<Array<Device>> = new EventEmitter<Array<Device>>();
  @Output() newLocationParent: EventEmitter<Location> = new EventEmitter<Location>();

  childLocations: Array<Location> = [];
  errorMesssage: string;
  devices: Array<Device> = [];
  showChildren: boolean = false;

  constructor(private locationService: LocationService, private router: Router) {
    
  }

  getChildren(curLocation: Location) {
    let children = curLocation.children;
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

  getDevices(curLocation: Location) {
    this.devices = [];
    this.locationService.getDeviceByLocationId(curLocation._id).subscribe(
      result => {
        for (var i = 0; i < result.length; i++) {
          this.devices.push(result[i]);
        }
        this.change.emit(this.devices);
      },
      error => this.errorMesssage = error
    );
  }

  clearChildren() {
    this.childLocations = [];
    this.devices = [];
    this.change.emit(this.devices);
  }
  
  toggleChildren(curLocation: Location) {
    if (this.showChildren) {
      this.clearChildren();
      this.showChildren = false;
    }
    else {
      this.getChildren(curLocation);
      this.showChildren = true;
    }
    this.getDevices(curLocation); // To delete

    this.router.navigate(['/dashboard/devices/', curLocation._id]);
  }

  deviceList(event) {
    this.devices = event;
    this.change.emit(this.devices);
  }

  newLocation(event) {
    this.newLocationParent.emit(event);
  }

  addLocation(location: Location) {
    this.newLocationParent.emit(location);
  }

  deleteLocation(location: Location) {
    if (location.children.length == 0) {
      this.locationService
        .deleteLocationById(location._id)
        .subscribe(
          result => console.log(result),
          error => console.log(error)
        );
    }
  }
}