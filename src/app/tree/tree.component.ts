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
  children: Array<Location> = [];
  constructor(private locationService: LocationService) {
      
  }

  ngOnInit() {
    console.log(this.currentLocation);
  }

  getChildren(children: Array<string>) {
    this.children = [];
    for (var i = 0; i < children.length; i++) {
      
    }
  }
}