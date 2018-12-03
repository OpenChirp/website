import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Device } from '../models/device';
import { Configuration } from '../config';

@Injectable()

export class DeviceGroupService {
  private apiUrl: string;
  private deviceUrl: string;
  private deviceGroupUrl: string;

  constructor (private http: Http, config: Configuration, private requestOptions: RequestOptions) {
    this.apiUrl = config.api_url;
    this.deviceUrl = this.apiUrl + "device/";
    this.deviceGroupUrl = this.apiUrl + "devicegroup/";
    this.requestOptions.withCredentials = true;
  }

  getAllDeviceGroups() {
    return this.http.get(this.deviceGroupUrl, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Add Device
  addDeviceGroup(body : any) {
    return this.http.post(this.deviceGroupUrl, body, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getGroupedDevices(devicegroup_id: string) {
    return this.http.get(this.deviceGroupUrl + devicegroup_id + '/devices', this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Add Device
  addDeviceToGroup(devicegroup_id: string, device_id: string) {
    return this.http.post(this.deviceGroupUrl + devicegroup_id + '/devices/' + device_id, null, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

  // Delete Device
  deleteDeviceFromGroup(devicegroup_id: string, device_id: string) {
    return this.http.delete(this.deviceGroupUrl + devicegroup_id + '/devices/' + device_id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

  getDeviceGroupTransducers(device_id: string) {
    return this.http.get(this.deviceGroupUrl + device_id+"/transducer", this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    let err: any;
    if (error instanceof Response) {
      const body = error.json() || '';
      err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${err.message || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
      err = error;
    }
    console.error(errMsg);
    if (err.message) {
      return observableThrowError(err);
    }
    else {
      return observableThrowError({
        message: error.statusText
      });
    }
  }
}
