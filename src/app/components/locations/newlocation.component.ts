import { Component, Input } from '@angular/core';
import { Location } from '../../models/location';
import { MdInputModule, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SuccessDialogService } from '../../services/success-dialog.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'new-location',
  templateUrl: './newlocation.component.html',
  styleUrls: ['./newlocation.component.scss']
})

export class NewLocationComponent {
  parent: Location = null;
  name: string = "";
  type: string = "";
  children: Array<string> = [];
  errorMessage: string = "";
  locationTypes: Array<string> = ["INDOOR", "BUILDING"];
  private sub: any;

  constructor(private locationService: LocationService, private route: ActivatedRoute,
              private router: Router,
              public snackBar: MdSnackBar,
              public successDialogService: SuccessDialogService,
              public errorDialogService: ErrorDialogService) {
    this.name = "";
    this.type = "";

  }

  ngOnInit() {
    this.name = "";
    this.type = "";
    this.route.params
      .switchMap((params: Params) => this.locationService.getLocationById(params['id']))
      .subscribe(
        result => this.parent = result,
        error => {
          this.errorMessage = error;
          this.router.navigate(['/home']);
        }
      );
  }

  add() {
    if (this.name != "" && this.type != "") {
      var body = {
        "name": this.name,
        "type": this.type,
        "children": this.children
      };
      this.locationService
        .addLocationByParentId(this.parent._id, body)
        .subscribe(
          result => {
            this.successDialogService
              .dialogPopup(SuccessDialogComponent, 'Added location: ' + this.name);
            this.locationService.notifyParent(this.parent._id);
            this.parent = null;
            this.name = "";
            this.type = "";
          },
          error => {
            this.errorDialogService
              .dialogPopup(ErrorDialogComponent, error.message + ': ' + this.name);
          }
        );
    } else {
      this.errorMessage = 'Name and type cannot be empty.';
      this.errorDialogService
        .dialogPopup(ErrorDialogComponent, this.errorMessage);
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
