
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { UserService } from '../../services/user.service';
import { Location } from '../../models/location';
import { Device } from '../../models/device';
import { TreeNodeComponent } from '../locationtree/tree.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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

  constructor(private locationService: LocationService, private userService: UserService, private router: Router) {
    this.rootLocation = null;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      result => {
        this.username = result.name || result.email || "";
        this.locationService.getRootLocation().subscribe(
          res => this.rootLocation = (res[0]),
          err => this.errorMessage = err.message
        );
      },
      error => this.router.navigate(['/'])
    );
  }
 
  deviceList(event) {
    this.devices = event;
  }

  newLocation(event) {
    this.newLocationParent = event;
  }
}
