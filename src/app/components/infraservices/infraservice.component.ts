import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { InfraService } from '../../services/infraservice';

import { SuccessDialogService } from '../../services/success-dialog.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
import { GlobalDataService } from '../../services/global.data.service';
import { MdDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog.component';
import { PropertiesComponent } from '../dialogs/properties.component';
import { ConfigRequiredComponent } from './config.required.component';

@Component({
  selector: 'infra-service',
  templateUrl: './infraservice.component.html',
  styleUrls: ['./infraservice.component.scss']
})

export class InfraServiceComponent {
  service: any = null;
  acl: any = {};
  tabIndex: number = 0;

  private tabNameToPosition: Map<string, Number> = new Map([
    ['properties', 0],
    ['devicelist', 1],
  ]);

  private tabPositionToName: string[] = [
    'properties',
    'devicelist',
  ];

  constructor(private route: ActivatedRoute, private infraService: InfraService, private router: Router,
    private successDialogService: SuccessDialogService,
    private errorDialogService: ErrorDialogService,
    private globalDataService: GlobalDataService,
    public dialog: MdDialog) {

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
        //window.location.hash = "#properties";
        //this.selectedIndex = this.tabNameToPosition.get('properties').valueOf();
      }
    });
    this.getService();
  }

  getService() {
    this.route.params
    .switchMap((params: Params) => this.infraService.getServiceByID(params['id']))
    .subscribe(
      result => {
        this.service = result;
        let ownerId = this.service.owner._id;
        let loggedInUserId = this.globalDataService.userid;
        this.acl.isOwner = (String(ownerId) === String(loggedInUserId));
      },
      error => this.router.navigate(['/home/services'])
      );
  }

  deleteService() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Delete Service ' + this.service.name + '?';
    dialogRef.componentInstance.confirmText = 'Delete';
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.infraService.deleteService(this.service._id).subscribe(
            data => {
              this.successDialogService.dialogPopup('Successfully deleted ' + this.service.name);
              this.router.navigate(['/home/services']);
            },
            error => {
              this.errorDialogService.dialogPopup(error.message);
            }
          );
        }
      }
    );
  }
  get selectedIndex() {
    return this.tabIndex;
  }
  set selectedIndex(index: number) {
    this.tabIndex = index;
    // TODO: This should probably be some official Angular way of redirecting
    window.location.hash = this.tabPositionToName[index];
  }
}
