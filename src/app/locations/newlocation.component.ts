import { Component, Input } from '@angular/core';
import { Location } from '../resources/location';
import { MdInputModule, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { LocationService } from '../resources/location.service';

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

  constructor(private locationService: LocationService, private route: ActivatedRoute, private router: Router, public snackBar: MdSnackBar) {

  }

  ngOnInit() {
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
            this.snackBar.open("Add location: " + this.name, "SUCCESS", { duration: 2000 });
            this.parent = null;
          },
          error => {
            this.errorMessage = error;
            this.snackBar.open(this.errorMessage, "ERROR", { duration: 2000 });
          }
        );
    }
    else {
      this.errorMessage = "Name and type cannot be empty.";
      this.snackBar.open(this.errorMessage, "ERROR", { duration: 2000 });
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}