
import { Component } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import {HttpClient, RESTClient, Client, GET, PUT, POST, DELETE, Headers, Path, Body, Query, Produces, MediaType} from 'angular-rest';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  title = 'OpenChirp';
}
