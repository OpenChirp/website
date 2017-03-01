
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
  rootLocation: Location = null;
  errorMessage: string;
  firstLevelChildren: Array<Location> = [];

  constructor(private locationService: LocationService) {
    document.getElementById("splash-nav").style.display = "none";
    document.getElementById("splash-footer").style.display = "none";
    this.rootLocation = null;
    this.firstLevelChildren = [];
  }

  ngOnInit() {
    this.locationService
      .getRootLocation()
      .subscribe(
        result => this.rootLocation = (result[0]), 
        error => this.errorMessage = error
      );
  }

  getChildren(children: Array<string>) {
    console.log(children);
    this.firstLevelChildren = [];
    for (var i = 0; i < children.length; i++) {
      this.locationService
        .getLocationById(children[i])
        .subscribe(
          result => this.firstLevelChildren.push(new Location(result.name, result.children)),
          error => this.errorMessage = error
        );
    }
  }

}
