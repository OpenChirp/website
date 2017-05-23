import { Component, Input } from '@angular/core';
import { Location } from '../../models/location';
import { MdInputModule, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SuccessDialogService } from '../../services/success-dialog.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent {
  parent: Location = null;
  location: Location = null;
  name: string = "";
  type: string = "";
  errorMessage: string = "";
  locationTypes: Array<string> = ["INDOOR", "BUILDING", "OUTDOOR"];
  private sub: any;

  constructor(private locationService: LocationService, private route: ActivatedRoute,
              private router: Router,
              public snackBar: MdSnackBar,
              public successDialogService: SuccessDialogService,
              public errorDialogService: ErrorDialogService) {
  }

  ngOnInit() {
    this.name = "";
    this.type = "";
    this.parent = null;
    this.location = null;

    this.route.params.subscribe((params: Params) => {
      if (params['location_id']) {
        this.locationService.getLocationById(params['location_id']).subscribe(
          result => {
            this.location = result;
            this.parent = null;
            this.name = this.location.name;
            if (this.location.type) {
              this.type = this.location.type;
            }
          },
          error => {
            this.errorDialogService.dialogPopup(error.message);
            this.router.navigate(['/home']);
          }
        );
      }
      else if (params['parent_id']) {
        this.locationService.getLocationById(params['parent_id']).subscribe(
          result => {
            this.parent = result;
            this.location = null;
            this.name = "";
            this.type = "";
          },
          error => {
            this.errorDialogService.dialogPopup(error.message);
            this.router.navigate(['/home']);
          }
        );
      }
      else {
        this.router.navigate(['/home']);
      }
    });
  }

  add() {
    if (this.name != "" && this.type != "") {
      var body = {
        "name": this.name,
        "type": this.type,
        "children": []
      };
      this.locationService
        .addLocationByParentId(this.parent._id, body)
        .subscribe(
          result => {
            this.successDialogService
              .dialogPopup('Added location: ' + this.name);
            this.locationService.notifyParent(this.parent._id);
            this.parent = null;
            this.name = "";
            this.type = "";
            this.router.navigate(['/home/devices/', result.id]);
          },
          error => {
            this.errorDialogService
              .dialogPopup(error.message + ': ' + this.name);
          }
        );
    }
    else {
      this.errorMessage = 'Name and type cannot be empty.';
      this.errorDialogService
        .dialogPopup(this.errorMessage);
    }
  }

  update() {
    if (this.name != "" && this.type != "") {
      var body = {
        "name": this.name,
        "type": this.type
      };
      this.locationService
        .updateLocationById(this.location._id, body)
        .subscribe(
          result => {
            this.successDialogService
              .dialogPopup('Updated location: ' + this.name);
            this.locationService.notifyParent(this.location._id);
            this.location = null;
            this.name = "";
            this.type = "";
            this.router.navigate(['/home/devices/', result.id]);
          },
          error => {
            this.errorDialogService
              .dialogPopup(error.message + ': ' + this.name);
          }
        );
    }
    else {
      this.errorMessage = 'Name and type cannot be empty.';
      this.errorDialogService
        .dialogPopup(this.errorMessage);
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
