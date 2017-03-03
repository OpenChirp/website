
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../rest/location.service';
import { Location } from '../rest/location';
import { TreeNodeComponent } from '../tree/tree.component';
import { Device } from '../rest/device';

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

  constructor(private locationService: LocationService) {
    document.getElementById("splash-nav").style.display = "none";
    document.getElementById("splash-footer").style.display = "none";
    this.rootLocation = null;
  }

  ngOnInit() {
    this.locationService
      .getRootLocation()
      .subscribe(
        result => this.rootLocation = (result[0]), 
        error => this.errorMessage = error
      );
  }

  deviceList(event) {
    this.devices = event;
  }

}
