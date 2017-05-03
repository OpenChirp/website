import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Device } from '../models/device';
import { Configuration } from '../config';

@Injectable()
export class UserService {

  private apiUrl: string;
  private userUrl: string;


  constructor(private http: Http, private config: Configuration) { 
    this.apiUrl = config.api_url;
    this.userUrl = this.apiUrl + "user/";
  }

  /**
   * Gets user information
   * @returns {Observable<R|T>}
   */
  getUser() {
    return this.http.get(this.userUrl, { withCredentials: true })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getServices(search: string) {
    return this.http.get(this.userUrl + "myservices?name=" + search)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getServiceByID(id: string) {
    return this.http.get(this.apiUrl + "service/" + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getDevices(search: string) {
    return this.http.get(this.userUrl + "mydevices?name=" + search)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getLocations(search: string) {
    return this.http.get(this.userUrl + "mylocations?name=" + search)
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
