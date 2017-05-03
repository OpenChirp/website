import { Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Location } from '../models/location';
import { Device } from '../models/device';
import { Configuration } from '../config';

@Injectable()
export class LocationService {
  private apiUrl: string;
  private locationUrl: string;

  // Observable source
  private _notifierSource = new Subject<string>();

  // Observable stream
  notifier$ = this._notifierSource.asObservable();

  constructor (private http: Http, private config: Configuration) {
    this.apiUrl = config.api_url;
    this.locationUrl = this.apiUrl + "location/";
  }
  
  notifyParent (parentId: string) {
    this._notifierSource.next(parentId);
  }

  // Gets the root location
  getRootLocation (): Observable<Location> {
    return this.http.get(this.locationUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Gets location specified by id
  getLocationById(id: string): Observable<Location> {
    return this.http.get(this.locationUrl + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Delete location
  deleteLocationById(id: string) {
    return this.http.delete(this.locationUrl + id)
             .map(this.extractData)
             .catch(this.handleError);
  }

  // Add location
  addLocationByParentId(id: string, body: any) {
    
    return this.http.post(this.locationUrl + id, body)
             .map(this.extractData)
             .catch(this.handleError);
  }

  // Get device by location id
  getDeviceByLocationId(id: string): Observable<Array<Device>> {
    return this.http.get(this.locationUrl + id + "/devices")
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