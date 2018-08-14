
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Configuration } from '../config';

@Injectable()
export class UserService {

  private apiUrl: string;
  private userUrl: string;

  constructor(private http: Http, private config: Configuration, private requestOptions: RequestOptions) {
    this.apiUrl = config.api_url;
    this.userUrl = this.apiUrl + "user/";
    this.requestOptions.withCredentials = true;
  }

  /**
   * Gets user information
   * @returns {Observable<R|T>}
   */
  getUser() {
    return this.http.get(this.userUrl, this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateUser(body: any) {
    return this.http.put(this.userUrl , body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

 // Get user token
  getToken() {
    return this.http.get(this.userUrl + "token" , this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

 // Create user token
  createToken() {
    return this.http.post(this.userUrl + "token" , this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

    // Delete user Token
  deleteToken() {
    return this.http.delete(this.userUrl + "token" , this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }
  getAllUsers() {
    return this.http.get(this.userUrl+"all", this.requestOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getMyServices(search: string) {
    return this.http.get(this.userUrl + "myservices?name=" + search, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }



  getMyDevices(search: string) {
    return this.http.get(this.userUrl + "mydevices?name=" + search, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

  getMyLocations(search: string) {
    return this.http.get(this.userUrl + "mylocations?name=" + search, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

  getMyShortcuts() {
    return this.http.get(this.userUrl + "shortcuts" , this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

  createCommandShort(body: any) {
    return this.http.post(this.userUrl + "shortcut", body, this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

  deleteShortcut(id: string) {
    return this.http.delete(this.userUrl + "shortcut/"+id,  this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
  }

  leaveGroup(groupId: string) {
    return this.http.delete(this.userUrl + "group/"+groupId,  this.requestOptions).pipe(
                    map(this.extractData),
                    catchError(this.handleError));
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
      return observableThrowError(err);
    } else {
      return observableThrowError({
        message: error.statusText
      });
    }
  }
}
