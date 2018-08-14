import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Device } from '../models/device';
import { Configuration } from '../config';

@Injectable()

export class DeviceService {
  private apiUrl: string;
  private deviceUrl: string;
  private grafanaUrl: string;

  constructor (private http: Http, config: Configuration, private requestOptions: RequestOptions) {
    this.apiUrl = config.api_url;
    this.deviceUrl = this.apiUrl + "device/";
    this.grafanaUrl = config.grafana_url;
    this.requestOptions.withCredentials = true;
  }

  getGrafanaUrl (){
    return this.grafanaUrl;
  }

  getDeviceById(device_id: string): Observable<Device> {
    return this.http.get(this.deviceUrl + device_id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  getDeviceTransducers(device_id: string) {
    return this.http.get(this.deviceUrl + device_id+"/transducer", this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
  // Update Device
  updateDeviceById(device_id: string, body: any) {
    return this.http.put(this.deviceUrl + device_id, body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Execute Command
  executeCommand(device_id: string, command_id: string) {
    return this.http.post(this.deviceUrl + device_id + "/command/" + command_id, {}, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Add Command
  addCommand(device_id: string, body: any) {
    return this.http.post(this.deviceUrl + device_id + "/command", body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Delete Command
  deleteCommand(device_id: string, command_id: string) {
    return this.http.delete(this.deviceUrl + device_id + "/command/" + command_id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Create Public Link
  createPublicLink(device_id: string, command_id: string) {
    var body = {};
    return this.http.post(this.deviceUrl + device_id + "/command/"+ command_id +"/publiclink", body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
 // Get Public Link
  getPublicLink(device_id: string, command_id: string) {
    return this.http.get(this.deviceUrl + device_id + "/command/"+ command_id +"/publiclink",  this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

  // Add New Transducer
  addTransducer(device_id: string, body: any) {
    return this.http.post(this.deviceUrl + device_id + "/transducer", body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
  // Publish To Transducer
  publishToTransducer(device_id: string, transducer_id:string, body: any) {
    return this.http.post(this.deviceUrl + device_id + "/transducer/"+ transducer_id, body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Delete Transducer
  editTransducer(device_id: string, transducer_id: string, body: any) {
    return this.http.put(this.deviceUrl + device_id + "/transducer/" + transducer_id, body, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // Delete Transducer
  deleteTransducer(device_id: string, transducer_id: string) {
    return this.http.delete(this.deviceUrl + device_id + "/transducer/" + transducer_id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Device Templates
  deviceTemplates() {
    return this.http.get(this.apiUrl + "devicetemplate", this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Device Template by ID
  deviceTemplate(id: string) {
    return this.http.get(this.apiUrl + "devicetemplate/" + id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Delete Device Template by ID
  deleteTemplate(id: string) {
    return this.http.delete(this.apiUrl + "devicetemplate/" + id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

 // Link Service
  linkService(device_id: string, service_id: string, body : any) {
    return this.http.post(this.deviceUrl+ device_id + "/service/"+service_id , body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
 // Update Service Link
  updateServiceLink(device_id: string, service_id: string, body : any) {
    return this.http.put(this.deviceUrl+ device_id + "/service/"+service_id , body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
  // Delete Service Link
  deleteServiceLink(device_id: string, service_id: string) {
    return this.http.delete(this.deviceUrl+ device_id + "/service/"+service_id , this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
  // Create device token
  createToken(device_id: string) {
    return this.http.post(this.deviceUrl+ device_id + "/token" , this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
  // Re-Create device token
  recreateToken(device_id: string) {
    return this.http.put(this.deviceUrl+ device_id + "/token" , this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
    // Delete Device Token
  deleteToken(device_id: string) {
    return this.http.delete(this.deviceUrl+ device_id + "/token" , this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
  // Add Device
  addDevice(body : any) {
    return this.http.post(this.deviceUrl, body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Delete Device
  deleteDevice(id: string) {
    return this.http.delete(this.deviceUrl + id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Save Device as Template
  saveTemplate(body: any) {
    return this.http.post(this.apiUrl + "devicetemplate", body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
  // Get All User's ACL
<<<<<<< HEAD
  getUsersAcl(device_id: string) {
    return this.http.get(this.deviceUrl + device_id + "/acl/users",  this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }
  // Get All User's ACL
  getGroupsAcl(device_id: string) {
    return this.http.get(this.deviceUrl + device_id + "/acl/groups",  this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
=======
  getUsersAcl(device_id: string) {
    return this.http.get(this.deviceUrl + device_id + "/acl/users",  this.requestOptions)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  // Get All User's ACL
  getGroupsAcl(device_id: string) {
    return this.http.get(this.deviceUrl + device_id + "/acl/groups",  this.requestOptions)
                    .map(this.extractData)
                    .catch(this.handleError);
>>>>>>> 44b34a3975a3ec267468b405218f39e0f13d1c4e
  }
   // Create ACL
  createAcl(device_id: string, entity_id: string, body: any) {
    return this.http.post(this.deviceUrl+ device_id + "/acl/"+entity_id, body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Update ACL
  updateAcl(device_id: string, entity_id: string, body: any) {
    return this.http.put(this.deviceUrl+ device_id + "/acl/"+entity_id, body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Delete ACL
  deleteAcl(device_id: string, entity_id: string) {
    return this.http.delete(this.deviceUrl+ device_id + "/acl/"+entity_id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
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
