
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../resources/location.service';
import { Location } from '../resources/location';
import { Device } from '../resources/device';
import { TreeNodeComponent } from '../tree/tree.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = 'OpenChirp';
  username = "John Doe";
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
