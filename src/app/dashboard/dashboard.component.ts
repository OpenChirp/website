
import { Component, OnInit } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { LocationService } from '../rest/location.service';
import { Location } from '../rest/location';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = 'OpenChirp';
  username = "John Doe";
  location: Location;
  errorMessage: string;
  constructor(private locationService: LocationService) {
    document.getElementById("splash-nav").style.display = "none";
    document.getElementById("splash-footer").style.display = "none";
  }

  myFun() {
    var self = this;
    this.locationService.getRootLocation().subscribe(result => this.location = result, error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.myFun();
  }
}
