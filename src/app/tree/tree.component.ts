import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../rest/location.service';
import { Location } from '../rest/location';

@Component({
  selector: 'tree-node',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeNodeComponent {
  @Input() currentLocation: Location;
  childLocations: Array<Location> = [];
  errorMesssage: string;

  constructor(private locationService: LocationService) {
      
  }

  ngOnInit() {
    
  }

  getChildren(children: Array<string>) {
    this.childLocations = [];
    for (var i = 0; i < children.length; i++) {
      this.locationService
        .getLocationById(children[i])
        .subscribe(
          result => this.childLocations.push(new Location(result.name, result.children)),
          error => this.errorMesssage = error
        );
    }
  }
}