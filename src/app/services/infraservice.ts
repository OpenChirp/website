import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../config';

@Injectable()
export class InfraService {

  private apiUrl: string;
  private serviceUrl: string;

  constructor(private http: Http, private config: Configuration, private requestOptions: RequestOptions) { 
    this.apiUrl = config.api_url;
    this.serviceUrl = this.apiUrl + "service/";
    this.requestOptions.withCredentials = true;
  }

  getAllServices() {
    return this.http.get(this.serviceUrl , this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }
     // Create service
  createService( body: any) {
    return this.http.post(this.serviceUrl, body, this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }
  
  getServiceByID(id: string) {
    return this.http.get(this.serviceUrl + id, this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }

  // Update service
  updateService(id: string, body: any) {
    return this.http.put(this.serviceUrl + id, body, this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }
  // Delete Service by ID
  deleteService(id: string) {
    return this.http.delete(this.serviceUrl + id, this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }
    // Create service token
  createToken(service_id: string) {
    return this.http.post(this.serviceUrl+ service_id + "/token" , this.requestOptions)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  // Re-Create service token
  recreateToken(service_id: string) {
    return this.http.put(this.serviceUrl+ service_id + "/token" , this.requestOptions)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
    // Delete Service Token
  deleteToken(service_id: string) {
    return this.http.delete(this.serviceUrl+ service_id + "/token" , this.requestOptions)
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