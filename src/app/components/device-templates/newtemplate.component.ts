import {switchMap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {DeviceService} from '../../services/device.service';
import {Device} from '../../models/device';
import {ErrorDialogService} from '../../services/error-dialog.service';
import {SuccessDialogService} from '../../services/success-dialog.service';

@Component({
  selector: 'new-template',
  templateUrl: './newtemplate.component.html',
  styleUrls: ['./newtemplate.component.scss']
})
export class NewTemplateComponent implements OnInit {
  name = '';
  description = '';
  device: Device = null;

  constructor(private deviceService: DeviceService, private route: ActivatedRoute,
              private router: Router,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              public snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => this.deviceService.getDeviceById(params['id'])))
      .subscribe(
        result => this.device = result,
        error => this.router.navigate(['/home'])
      );
  }

  add() {
    if (this.name !== '' && this.description !== '') {
      const body: any = {
        name: this.name,
        description: this.description,
        device_id: this.device._id
      };

      this.deviceService.saveTemplate(body).subscribe(
        saveResult => {

          // this.snackBar.open("Save Template Success!", this.name, { duration: 2000 }).afterDismissed().subscribe(
          this.successDialogService.dialogPopup('Template Created ' + this.name).subscribe(
            result => this.router.navigate(['/home/devicetemplates/'])
          );
        },
        error => {
          // this.snackBar.open(error.message, this.name, errorConfig);
          this.errorDialogService
            .dialogPopup(error.message + ': ' + this.name);
        }
      );

    } else {
      this.snackBar.open('Name and description are empty!', 'ERROR', {duration: 2000});
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
