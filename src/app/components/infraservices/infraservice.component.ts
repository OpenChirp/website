import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { InfraService } from '../../services/infraservice';

import { SuccessDialogService } from '../../services/success-dialog.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
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
  constructor(private route: ActivatedRoute, private infraService: InfraService, private router: Router,
    private successDialogService: SuccessDialogService, 
    private errorDialogService: ErrorDialogService,
    public dialog: MdDialog) {

  }

  ngOnInit() {
    this.getService();
  }

  getService() {
    this.route.params
    .switchMap((params: Params) => this.infraService.getServiceByID(params['id']))
    .subscribe(
      result => this.service = result,
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
    let dialogRef = this.dialog.open(ConfigRequiredComponent, { width: '600px' });
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
}