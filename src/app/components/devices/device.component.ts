import {switchMap} from 'rxjs/operators';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material';


import {Device} from '../../models/device';
import {DeviceService} from '../../services/device.service';
import {GlobalDataService} from '../../services/global.data.service';
import {SuccessDialogService} from '../../services/success-dialog.service';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog.component';
import {UserService} from '../../services/user.service';
import {ErrorDialogService} from '../../services/error-dialog.service';

@Component({
  selector: 'device-info',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DeviceComponent implements OnInit {

  get selectedIndex() {
    return this.tabIndex;
  }

  set selectedIndex(index: number) {
    this.tabIndex = index;
    // TODO: This should probably be some official Angular way of redirecting
    window.location.hash = this.tabPositionToName[index];
  }

  device: Device = null;
  acl: any = {};
  errorMessage = '';
  successMessage = '';
  tabIndex = 0;

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private deviceService: DeviceService,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              private userService: UserService,
              private globalDataService: GlobalDataService,
              public dialog: MatDialog) {
  }


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
        // window.location.hash = "#properties";
        // this.selectedIndex = this.tabNameToPosition.get('properties').valueOf();
      }
    });
    this.getDevice();
  }

  saveTemplate() {
    this.router.navigate(['/home/newtemplate/', this.device._id]);
  }

  getDevice(val: any) {
    this.route.params.pipe(
      switchMap((params: Params) => this.deviceService.getDeviceById(params['id'])))
      .subscribe(
        result => {
          this.device = result;
          if (this.device.__t === 'DeviceGroup') {
            this.device.isDeviceGroup = true;
          }
          const ownerId = this.device.owner._id;
          const loggedInUserId = this.globalDataService.userid;
          const isAdmin = this.globalDataService.isAdmin;
          this.acl.isOwner = String(ownerId) === String(loggedInUserId);
          if (this.acl.isOwner || isAdmin) {
            this.acl.writeAccess = true;
          }
        },
        error => this.router.navigate(['/home'])
      );
  }

  deleteDevice() {
    if (this.device) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.componentInstance.dialogText = 'Delete Device ' + this.device.name + '?';
      dialogRef.componentInstance.confirmText = 'Delete';
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

}
