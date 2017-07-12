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
  service:any  = null;
  acl :any = {};
  tokenTip : string = "Use the service id as username and this token as password to authenticate over basic auth for REST API and MQTT. Make sure to copy it now. You won’t be able to see it again!";

  constructor(private route: ActivatedRoute, private infraService: InfraService, private router: Router,
    private successDialogService: SuccessDialogService, 
    private errorDialogService: ErrorDialogService,
    private globalDataService:GlobalDataService,
    public dialog: MdDialog) {

  }

  ngOnInit() {
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
        if(String(ownerId) === String(loggedInUserId)){
          this.acl.isOwner = true;
        }
        else{
          this.acl.isOwner = false;
        } 
      },
      error => this.router.navigate(['/home/services'])
      );
  }

  updateService() {
    this.infraService.updateService(this.service._id, this.service).subscribe(
      result => {
        this.successDialogService
        .dialogPopup("Updated: " + this.service.name);
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message + ': ' + this.service.name);
      }
      );
  }

  deleteService() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = "Delete Service " + this.service.name + "?";
    dialogRef.componentInstance.confirmText = "Delete";
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.infraService.deleteService(this.service._id).subscribe(
            result => { 
              this.successDialogService.dialogPopup("Successfully deleted " + this.service.name);
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
  
  viewProperties() {
    let dialogRef = this.dialog.open(PropertiesComponent, { width: '600px' });
    dialogRef.componentInstance.properties = this.service.properties || {};
    dialogRef.componentInstance.source = this.service.name;
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          var newService = this.service;
          newService.properties = result;
          this.infraService.updateService(this.service._id, newService).subscribe(
            res => this.successDialogService.dialogPopup("Updated Service: " + this.service.name),
            err => this.errorDialogService.dialogPopup(err.message)
            );
        }
      }
      );
  }

  viewConfigRequired() {
    let dialogRef = this.dialog.open(ConfigRequiredComponent, { width: '900px' });
    dialogRef.componentInstance.config = this.service.config_required || {};
    dialogRef.componentInstance.source = this.service.name;
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          var newService = this.service;
          newService.config_required = result;
          this.infraService.updateService(this.service._id, newService).subscribe(
            res => this.successDialogService.dialogPopup("Updated Service: " + this.service.name),
            err => this.errorDialogService.dialogPopup(err.message)
            );
        }
      }
      );
  }

  createServiceToken() {
    this.infraService.createToken(this.service._id).subscribe(
      result => {
        this.getService();
        this.successDialogService
        .dialogPopupNoAutoClose("Token : " + result, this.tokenTip);
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message + ': ' + this.service.name);
      }
      );
  }

  recreateServiceToken() {  
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = "Regenerate token for " + this.service.name + "? ";
    dialogRef.componentInstance.dialogWarning = "This will over-write the previous token."
    dialogRef.componentInstance.confirmText = "Generate";
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.infraService.recreateToken(this.service._id).subscribe(
            result => {
              this.successDialogService
              .dialogPopupNoAutoClose("Token : " + result, this.tokenTip); 
            },
            error => this.errorDialogService
            .dialogPopup(error.message + ': ' + this.service.name)
            );
        } // End if
      } // End result
      ); // End subscribe
  } // End function
  
  deleteServiceToken() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = "Delete token for service " + this.service.name + "? ";
    dialogRef.componentInstance.dialogWarning = "The token will no longer work for authentication over REST and MQTT."
    dialogRef.componentInstance.confirmText = "Delete";
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.infraService.deleteToken(this.service._id).subscribe(
            result => {
              this.getService();
              this.successDialogService
              .dialogPopup('Successfully deleted token for: ' + this.service.name);               
            },
            error => this.errorDialogService
            .dialogPopup(error.message + ': ' + this.service.name)
            );// End delete token subscribe.
        } // End if
      } // End result
      ); // End subscribe    
  } // End function

}