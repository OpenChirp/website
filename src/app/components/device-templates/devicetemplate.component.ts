import {switchMap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {DeviceService} from '../../services/device.service';
import {SuccessDialogService} from '../../services/success-dialog.service';
import {ErrorDialogService} from '../../services/error-dialog.service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog.component';


@Component({
  selector: 'device-template',
  templateUrl: './devicetemplate.component.html',
  styleUrls: ['./devicetemplate.component.scss']
})

export class DeviceTemplateComponent implements OnInit {
  template: any = null;

  constructor(private route: ActivatedRoute,
              private deviceService: DeviceService,
              private router: Router,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getTemplate();
  }

  getTemplate() {
    this.route.params.pipe(
      switchMap((params: Params) => this.deviceService.deviceTemplate(params['id'])))
      .subscribe(
        result => {
          this.template = result;
        },
        error => this.router.navigate(['/home'])
      );
  }

  newDevice() {
    this.router.navigate(['/home/newdevice', {template_id: this.template._id}]);
  }

  deleteTemplate() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Delete Template ' + this.template.name + '?';
    dialogRef.componentInstance.confirmText = 'Delete';
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceService.deleteTemplate(this.template._id).subscribe(
            result => {
              this.successDialogService.dialogPopup('Successfully deleted ' + this.template.name);
              this.router.navigate(['/home/devicetemplates']);
            },
            error => {
              this.errorDialogService.dialogPopup(error.message);
            }
          );
        }
      }
    );
  }

}
