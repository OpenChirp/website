import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location';
import { DeviceService } from '../../services/device.service';
import { UserService } from '../../services/user.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
import { SuccessDialogService } from '../../services/success-dialog.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})

export class DashboardMainComponent {
  shortcuts: Array<Object> = [];
  locations: Array<Location> = [];
  user: any = null;
  myDevicesLocIframeSrc: SafeResourceUrl;
  myDevicesLocSrcPrefix: string = "http://openchirp.io:9000/map/owner/";

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(private router: Router,
              private deviceService: DeviceService,
              private userService: UserService,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              private sanitizer: DomSanitizer) {

  }
  
  ngOnInit() {
    this.getShortcuts();
    this.getLocations();
    this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe(
       result => {
         this.user = result;
         const iframeUrl: string = this.myDevicesLocSrcPrefix + this.user._id;
         this.myDevicesLocIframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(iframeUrl);
       },
       error =>  this.errorDialogService.dialogPopup(error.message)
     );
 }

  getShortcuts() {
    this.userService.getMyShortcuts().subscribe(
      out => {
         this.shortcuts = out;
      });    
  }  

  getLocations() {
    this.userService.getMyLocations("").subscribe(
      result => this.locations = result
    );
  }

 deleteShortcut(shortcut: any) {
    this.userService.deleteShortcut(shortcut._id).subscribe(
      result => {
        this.successDialogService
          .dialogPopup('Deleted : ' + shortcut.name);
        this.getShortcuts();
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message + ': ' + shortcut.name);
      }
      );
        
  }  
  execute(shortcut: any) {
    this.deviceService.executeCommand(shortcut.device_id, shortcut.command_id).subscribe(
      result => {
        this.successDialogService
          .dialogPopup('Executed: ' + shortcut.name);

      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message + ': ' + shortcut.name);
      }
    );
  }

  gotoDevices(id: string) {
    this.router.navigate(['/home/devices/', id]);
  }

}
