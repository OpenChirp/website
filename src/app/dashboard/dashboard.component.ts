
import { Component, OnInit } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { LocationService } from '../rest/location.service';
import { Location } from '../rest/location';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = 'OpenChirp';
  username = "John Doe";
  location: Location;
  locations: Array<Location> = [];
  errorMessage: string;
  childLocations: Array<Location>;

  constructor(private locationService: LocationService) {
    document.getElementById("splash-nav").style.display = "none";
    document.getElementById("splash-footer").style.display = "none";
    this.location = null;
  }

  ngOnInit() {
    this.locationService.getRootLocation().subscribe(result => this.locations.push(result), error => this.errorMessage = error);
  }

  getChildren(children: Array<string>) {
    var arrObs: Array<Observable<Location>> = this.locationService.getChildrenLocations(children);
    var self = this;
    for (let x of arrObs) {
      x.subscribe(result => this.childLocations.push(result), error => this.errorMessage = <any>error);
    }
  }
}
