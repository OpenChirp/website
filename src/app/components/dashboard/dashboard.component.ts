
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location';
import { Device } from '../../models/device';
import { TreeNodeComponent } from '../locationtree/tree.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = 'OpenChirp';
  username = 'John Doe';
  rootLocation: Location = null;
  errorMessage: string;
  devices: Array<Device> = [];
  newLocationParent: Location = null;

  constructor(private locationService: LocationService) {
    this.rootLocation = null;
  }

  ngOnInit() {
    this.locationService
      .getRootLocation()
      .subscribe(
        result => this.rootLocation = (result[0]),
        error => this.errorMessage = error.message
      );
  }

  deviceList(event) {
    this.devices = event;
  }

  newLocation(event) {
    this.newLocationParent = event;
  }
}
