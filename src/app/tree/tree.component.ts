import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  constructor(private locationService: LocationService) {
    
  }

  getChildren(curLocation: Location) {
    let children = curLocation.children;
    if (this.childLocations.length == 0) {
      for (var i = 0; i < children.length; i++) {
        this.locationService
          .getLocationById(children[i])
          .subscribe(
            result => this.childLocations.push(result),
            error => this.errorMesssage = error
          );
      }
    }
    this.devices = [];
    this.locationService.getDeviceByLocationId(curLocation._id).subscribe(
      result => {
        for (var i = 0; i < result.length; i++) {
          var device = result[i];
          this.devices.push(device);
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
  }

  deviceList(event) {
    this.devices = event;
    this.change.emit(this.devices);
  }

  newLocation(event) {
    this.newLocationParent.emit(event);
  }

  addLocation(location: Location) {
    console.log(location._id);
    this.newLocationParent.emit(location);
  }
}