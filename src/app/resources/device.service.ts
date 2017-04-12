import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Device } from './device';

@Injectable()

export class DeviceService {
  // TODO: get from config.json
  private locationUrl = 'http://openchirp.andrew.cmu.edu:10010/api/device/';

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

  executeCommand(device_id: string, command_id: string) {
    return this.http.post(this.locationUrl + device_id + "/command/" + command_id, {})
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