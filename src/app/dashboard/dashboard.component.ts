
import { Component } from '@angular/core';
import { Http, Request, Response } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  title = 'OpenChirp';
  username = "John Doe";
  constructor() {
    document.getElementById("splash-nav").style.display = "none";
    document.getElementById("splash-footer").style.display = "none";
  }
}
