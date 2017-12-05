import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import 'rxjs/add/operator/switchMap';

import { Device } from '../../models/device';
import { DeviceService } from '../../services/device.service';
import { GlobalDataService } from '../../services/global.data.service';
import { SuccessDialogService } from '../../services/success-dialog.service';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog.component';
import { UserService } from '../../services/user.service';
import { ErrorDialogService } from '../../services/error-dialog.service';

@Component({
  selector: 'device-info',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DeviceComponent {
  device: Device = null;
  acl :any = {};
  errorMessage: string = "";
  successMessage: string = "";
  tabIndex: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private deviceService: DeviceService,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              private userService: UserService,
              private globalDataService:GlobalDataService,
              public dialog: MdDialog) {
  }

  private tabNameToPosition: Map<string, Number> = new Map([
    ['properties', 0],
    ['transducers', 1],
    ['commands', 2],
    ['services', 3],
    ['visualization', 4],
    ['security', 5]
  ]);

  private tabPositionToName: string[] = [
    'properties',
    'transducers',
    'commands',
    'services',
    'visualization',
    'security'
  ];


  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
    // Automatically move to the tab indicated in #hashtag
    if (this.tabNameToPosition.has(fragment)) {
      this.selectedIndex = this.tabNameToPosition.get(fragment).valueOf();
    } else {
      // We cannot do a redirect immediately because this would
      // mess up the back stack, such that you would never be able to "go back".
      // The fix would be to have the sender already attach the #properties
      // tag to device page reference.
      // TODO: This should probably be some official Angular way of redirecting
      //window.location.hash = "#properties";
      //this.selectedIndex = this.tabNameToPosition.get('properties').valueOf();
    }
    })
    this.getDevice();
  }

  saveTemplate() {
    this.router.navigate(['/home/newtemplate/', this.device._id]);
  }

  getDevice() {
    this.route.params
      .switchMap((params: Params) => this.deviceService.getDeviceById(params['id']))
      .subscribe(
        result => {
          this.device = result;
          let ownerId = this.device.owner._id;
          let loggedInUserId = this.globalDataService.userid;
          let isAdmin = this.globalDataService.isAdmin;
          if(String(ownerId) === String(loggedInUserId)){
            this.acl.isOwner = true;
          }
          else{
            this.acl.isOwner = false;
          }
          if(this.acl.isOwner || isAdmin){
            this.acl.writeAccess = true;
          }
        },
        error => this.router.navigate(['/home'])
      );
  }

  deleteDevice() {
    if (this.device) {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.componentInstance.dialogText = "Delete Device " + this.device.name + "?";
      dialogRef.componentInstance.confirmText = "Delete";
      dialogRef.afterClosed().subscribe(
        result => {
          if (result) {
            this.deviceService.deleteDevice(this.device._id).subscribe(
              result => {
                this.successDialogService
                  .dialogPopup('Successfully deleted: ' + this.device.name);
                this.router.navigate(['/home/mydevices']);
              },
              error => this.errorDialogService
                        .dialogPopup(error.message + ': ' + this.device.name)
            ); // End Delete Device Subscribe
          } // End if
        } // End result
      ); // End subscribe
    } // End if device
  } // End function

  get selectedIndex() {
    return this.tabIndex;
  }

  set selectedIndex(index : number) {
    this.tabIndex = index;
    // TODO: This should probably be some official Angular way of redirecting
    window.location.hash = this.tabPositionToName[index];
  }

}
