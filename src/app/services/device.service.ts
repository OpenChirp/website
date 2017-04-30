import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Device } from '../models/device';

@Injectable()

export class DeviceService {
  // TODO: get from config.json
  private locationUrl = 'http://openchirp.andrew.cmu.edu:10010/api/device/';
  private apiLocation = 'http://openchirp.andrew.cmu.edu:10010/api/';

  constructor (private http: Http) {
    
  }
  
  // Gets the root location
  getDeviceById(device_id: string): Observable<Device> {
    return this.http.get(this.locationUrl + device_id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Update Device
  updateDeviceById(device_id: string, body: any) {
    return this.http.put(this.locationUrl + device_id, body)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Execute Command
  executeCommand(device_id: string, command_id: string) {
    return this.http.post(this.locationUrl + device_id + "/command/" + command_id, {})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Add Command
  addCommand(device_id: string, body: any) {
    return this.http.post(this.locationUrl + device_id + "/command", body)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Delete Command
  deleteCommand(device_id: string, command_id: string) {
    return this.http.delete(this.locationUrl + device_id + "/command/" + command_id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Add New Transducer
  addTransducer(device_id: string, body: any) {
    return this.http.post(this.locationUrl + device_id + "/transducer", body)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Delete Transducer
  deleteTransducer(device_id: string, transducer_id: string) {
    return this.http.delete(this.locationUrl + device_id + "/transducer/" + transducer_id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Device Templates
  deviceTemplates() {
    return this.http.get(this.apiLocation + "devicetemplate")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Device Template by ID
  deviceTemplate(id: string) {
    return this.http.get(this.apiLocation + "devicetemplate/" + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Add Device
  addDevice(body : any) {
    return this.http.post(this.locationUrl, body)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Delete Device
  deleteDevice(id: string) {
    return this.http.delete(this.locationUrl + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Save Device as Template
  saveTemplate(body: any) {
    console.log(body);
    return this.http.post(this.apiLocation + "devicetemplate", body)
                    .map(this.extractData)
                    .catch(this.handleError);
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
      return Observable.throw(err);
    }
    else {
      return Observable.throw({
        message: error.statusText
      });
    }
  }
}