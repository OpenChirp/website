import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../config';

@Injectable()
export class GroupService {

  private apiUrl: string;
  private groupUrl: string;

  constructor(private http: Http, private config: Configuration, private requestOptions: RequestOptions) { 
    this.apiUrl = config.api_url;
    this.groupUrl = this.apiUrl + "group/";
    this.requestOptions.withCredentials = true;
  }


  getAllGroups(search:string){
  	return this.http.get(this.groupUrl+"?name" + search, this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getGroupById(groupId:string){
    return this.http.get(this.groupUrl+ groupId, this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }


  createGroup( body: any) {
    return this.http.post(this.groupUrl, body, this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getMembersOfGroup( groupdId: string){
    return this.http.get(this.groupUrl + groupdId + "/members", this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);
  }
  
  addUserToGroup(groupId: string, userId: string, write_access: boolean){
    var body = { "user_id" : userId, "write_access": write_access };
    return this.http.post(this.groupUrl + groupId +"/member", body, this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError);   
  }

  removeUserFromGroup(groupId: string, userId: string){
    var body = { "user_id" : userId };
    return this.http.put(this.groupUrl + groupId +"/member", body, this.requestOptions)
    .map(this.extractData)
    .catch(this.handleError); 
  }

  // Delete group
  deleteGroup(id: string) {
    return this.http.delete(this.groupUrl + id, this.requestOptions)
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
