import {Injectable, EventEmitter, Output} from '@angular/core';

@Injectable()
export class GlobalDataService {
  userid:string;
  isAdmin:boolean;

 setData(userid:string, isAdmin:boolean){
 	this.userid = userid;
 	this.isAdmin = isAdmin;

 }


}