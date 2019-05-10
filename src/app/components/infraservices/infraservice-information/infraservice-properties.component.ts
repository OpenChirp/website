import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InfraService} from '../../../services/infraservice';

import {SuccessDialogService} from '../../../services/success-dialog.service';
import {ErrorDialogService} from '../../../services/error-dialog.service';
import {GlobalDataService} from '../../../services/global.data.service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog.component';
import {PropertiesComponent} from '../../dialogs/properties.component';
import {ConfigRequiredComponent} from '../config.required.component';

@Component({
  selector: 'infra-service-properties',
  templateUrl: './infraservice-properties.component.html',
  styleUrls: ['./infraservice-properties.component.scss']
})

export class InfraServicePropertiesComponent {
  @Input() service: any = null;
  @Input() acl: any = {};
  @Output() updateInfraservice: EventEmitter<boolean> = new EventEmitter();
  tokenTip: 'Use the service id as username and this token as password to authenticate over basic auth for REST API and MQTT. Make sure to copy it now. You won’t be able to see it again!';

  constructor(private route: ActivatedRoute, private infraService: InfraService, private router: Router,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              private globalDataService: GlobalDataService,
              public dialog: MatDialog) {

  }

  updateService() {
    this.infraService.updateService(this.service._id, this.service).subscribe(
      result => {
        this.updateInfraservice.emit(true);
        this.successDialogService
          .dialogPopup('Updated: ' + this.service.name);
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message + ': ' + this.service.name);
      }
    );
  }

  viewProperties() {
    const dialogRef = this.dialog.open(PropertiesComponent, {width: '600px'});
    dialogRef.componentInstance.properties = this.service.properties || {};
    dialogRef.componentInstance.source = this.service.name;
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          const newService = this.service;
          newService.properties = result;
          this.infraService.updateService(this.service._id, newService).subscribe(
            res => this.successDialogService.dialogPopup('Updated Service: ' + this.service.name),
            err => this.errorDialogService.dialogPopup(err.message)
          );
        }
      }
    );
  }

  viewConfigRequired() {
    const dialogRef = this.dialog.open(ConfigRequiredComponent, {width: '900px'});
    dialogRef.componentInstance.config = this.service.config_required || {};
    dialogRef.componentInstance.source = this.service.name;
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          const newService = this.service;
          newService.config_required = result;
          this.infraService.updateService(this.service._id, newService).subscribe(
            res => this.successDialogService.dialogPopup('Updated Service: ' + this.service.name),
            err => this.errorDialogService.dialogPopup(err.message)
          );
        } else {
          this.updateInfraservice.emit(true);
        }
      }
    );
  }

  createServiceToken() {
    this.infraService.createToken(this.service._id).subscribe(
      result => {
        this.updateInfraservice.emit(true);
        this.successDialogService
          .dialogPopupNoAutoClose('Token : ' + result, this.tokenTip);
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message + ': ' + this.service.name);
      }
    );
  }

  recreateServiceToken() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Regenerate token for ' + this.service.name + '?';
    dialogRef.componentInstance.dialogWarning = 'This will over-write the previous token.';
    dialogRef.componentInstance.confirmText = 'Generate';
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.infraService.recreateToken(this.service._id).subscribe(
            data => {
              this.successDialogService
                .dialogPopupNoAutoClose('Token : ' + data, this.tokenTip);
            },
            error => this.errorDialogService
              .dialogPopup(error.message + ': ' + this.service.name)
          );
        } // End if
      } // End result
    ); // End subscribe
  } // End function

  deleteServiceToken() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Delete token for service ' + this.service.name + '? ';
    dialogRef.componentInstance.dialogWarning = 'The token will no longer work for authentication over REST and MQTT.';
    dialogRef.componentInstance.confirmText = 'Delete';
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.infraService.deleteToken(this.service._id).subscribe(
            data => {
              this.updateInfraservice.emit(true);
              this.successDialogService
                .dialogPopup('Successfully deleted token for: ' + this.service.name);
            },
            error => this.errorDialogService
              .dialogPopup(error.message + ': ' + this.service.name)
          ); // End delete token subscribe.
        } // End if
      } // End result
    ); // End subscribe
  } // End function

}
