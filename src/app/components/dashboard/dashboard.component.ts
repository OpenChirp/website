
import { Component, OnInit, Inject } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { UserService } from '../../services/user.service';
import { GlobalDataService } from '../../services/global.data.service';
import { Location } from '../../models/location';
import { Device } from '../../models/device';
import { TreeNodeComponent } from '../locationtree/tree.component';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = 'OpenChirp';
  username = 'John Doe';
  userGroups : Array<string> = [];
  isAdmin = false;
  rootLocation: Location = null;
  errorMessage: string;
  devices: Array<Device> = [];
  newLocationParent: Location = null;
  logout_url : string;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private globalDataService: GlobalDataService,
    private locationService: LocationService,
    private config: Configuration,
    private userService: UserService,
    private router: Router) {
    this.rootLocation = null;
    this.logout_url = config.logout_url;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      result => {
        this.username = result.name || result.email || "";
        this.userGroups = result.groups.map(function(val:any) { return val.name ;});
        if(this.userGroups.indexOf("admin") > -1 ){
          this.isAdmin = true;
        }
        this.globalDataService.setData(result._id, this.isAdmin);
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

  goToCommunity() {
    this.document.location.href = "http://community.openchirp.io";
  }

  goToDocs() {
    this.document.location.href = "https://github.com/OpenChirp/docs/wiki";
  }
}
