
import {throwError as observableThrowError,  Observable ,  Subject } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable} from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';



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

  constructor (private http: Http, private config: Configuration, private requestOptions: RequestOptions) {
    this.apiUrl = config.api_url;
    this.locationUrl = this.apiUrl + "location/";
    this.requestOptions.withCredentials = true;
  }

  notifyParent (parentId: string) {
    this._notifierSource.next(parentId);
  }

  // Gets the root location
  getRootLocation (): Observable<Location> {
    return this.http.get(this.locationUrl, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Gets all location
  getAllLocations(): Observable<Location[]> {
    return this.http.get(this.locationUrl + 'all', this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // Gets location specified by id
  getLocationById(id: string): Observable<Location> {
    return this.http.get(this.locationUrl + id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Delete location
  deleteLocationById(id: string) {
    return this.http.delete(this.locationUrl + id, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Add location
  addLocationByParentId(id: string, body: any) {
    return this.http.post(this.locationUrl + id, body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Update Location
  updateLocationById(id: string, body: any) {
    return this.http.put(this.locationUrl + id, body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError),);
  }

  // Get device by location id
  getDeviceByLocationId(id: string): Observable<Array<Device>> {
    return this.http.get(this.locationUrl + id + "/devices", this.requestOptions).pipe(
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
