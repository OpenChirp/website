
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Configuration } from '../config';

@Injectable()
export class AdminService {

  private apiUrl: string;
  private adminUrl: string;

  constructor(private http: Http, private config: Configuration, private requestOptions: RequestOptions) { 
    this.apiUrl = config.api_url;
    this.adminUrl = this.apiUrl + "admin/";
 
  }


  getAllStats(){
  	return this.http.get(this.adminUrl +"stats", this.requestOptions).pipe(
    map(this.extractData),
    catchError(this.handleError),);
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
