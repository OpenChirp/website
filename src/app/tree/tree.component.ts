import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { LocationService } from '../resources/location.service';
import { Location } from '../resources/location';

@Component({
  selector: 'tree-node',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeNodeComponent {
  @Input() currentLocation: Location;

  childLocations: Array<Location> = [];
  errorMesssage: string;
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

  clearChildren() {
    this.childLocations = [];
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
    this.router.navigate(['/dashboard/devices/', curLocation._id]);
  }

  addLocation(location: Location) {
    this.router.navigate(['/dashboard/newlocation', location._id]);
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