import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Location } from './location';

@Injectable()

export class LocationService {
  // TODO: get from config.json
  private locationUrl = 'http://openchirp.andrew.cmu.edu:10010/api/location';

  constructor (private http: Http) {
    
  }
  
  // Gets the root location
  getRootLocation (): Observable<Location> {
    return this.http.get(this.locationUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Gets location specified by id
  getLocationById(id: string): Observable<Location> {
    return this.http.get(this.locationUrl + "/" + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Delete location
  deleteLocationById(id: string) {
    this.http.delete(this.locationUrl + "/" + id)
             .map(this.extractData)
             .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}