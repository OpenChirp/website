import {throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';

import {Configuration} from '../config';

@Injectable()

export class DeviceGroupService {
  private apiUrl: string;
  private deviceUrl: string;
  private deviceGroupUrl: string;

  constructor(private http: Http, config: Configuration, private requestOptions: RequestOptions) {
    this.apiUrl = config.api_url;
    this.deviceUrl = this.apiUrl + 'device/';
    this.deviceGroupUrl = this.apiUrl + 'devicegroup/';
    this.requestOptions.withCredentials = true;
  }

  getAllDeviceGroups() {
    return this.http.get(this.deviceGroupUrl, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Add Device
  addDeviceGroup(body: any) {
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
    return this.http.get(this.deviceGroupUrl + device_id + '/transducer', this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
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
    } else {
      return observableThrowError({
        message: error.statusText
      });
    }
  }

  getBroadcastTransducers(device_id: string) {
    return this.http.get(this.deviceGroupUrl + device_id + '/broadcasttransducer', this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  addBroadcastTransducer(device_id: string, body: any) {
    return this.http.post(this.deviceGroupUrl + device_id + '/broadcasttransducer', body, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Publish To Transducer
  publishToBroadcastTransducer(device_id: string, transducer_id: string, body: any) {
    return this.http.post(this.deviceGroupUrl + device_id + '/broadcasttransducer/' + transducer_id, body, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Edit  Transducer
  editBroadcastTransducer(device_id: string, transducer_id: string, body: any) {
    return this.http.put(this.deviceGroupUrl + device_id + '/broadcasttransducer/' + transducer_id, body, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Delete Transducer
  deleteBroadcastTransducer(device_id: string, transducer_id: string) {
    return this.http.delete(this.deviceGroupUrl + device_id + '/broadcasttransducer/' + transducer_id, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Execute Command
  executeBroadcastCommand(device_id: string, command_id: string) {
    return this.http.post(this.deviceGroupUrl + device_id + '/broadcastcommand/' + command_id, {}, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Add Command
  addBroadcastCommand(device_id: string, body: any) {
    return this.http.post(this.deviceGroupUrl + device_id + '/broadcastcommand', body, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Delete Command
  deleteBroadcastCommand(device_id: string, command_id: string) {
    return this.http.delete(this.deviceGroupUrl + device_id + '/broadcastcommand/' + command_id, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Create Public Link
  createPublicBroadcastLink(device_id: string, command_id: string) {
    const body = {};
    return this.http.post(this.deviceGroupUrl + device_id + '/broadcastcommand/' + command_id +
      '/publiclink', body, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Get Public Link
  getPublicBroadcastLink(device_id: string, command_id: string) {
    return this.http.get(this.deviceGroupUrl + device_id + '/broadcastcommand/' + command_id + '/publiclink', this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}
