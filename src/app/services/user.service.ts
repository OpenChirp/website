import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Device } from '../models/device';

@Injectable()
export class UserService {

  private locationUrl = 'http://openchirp.andrew.cmu.edu:10010/api/user/';
  private apiLocationUrl = 'http://openchirp.andrew.cmu.edu:10010/api/';

  constructor(private http: Http) { }

  /**
   * Gets user information
   * @returns {Observable<R|T>}
   */
  private getUser() {
    return this.http.get(this.locationUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getServices(search: string) {
    return this.http.get(this.locationUrl + "myservices?name=" + search)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getServiceByID(id: string) {
    return this.http.get(this.apiLocationUrl + "service/" + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getDevices(search: string) {
    return this.http.get(this.locationUrl + "mydevices?name=" + search)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getLocations(search: string) {
    return this.http.get(this.locationUrl + "mylocations?name=" + search)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
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
      return Observable.throw(err);
    } else {
      return Observable.throw({
        message: error.statusText
      });
    }
  }
}
