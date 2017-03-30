import { Component, Input } from '@angular/core';
import { Location } from '../resources/location';
import { MdInputModule } from '@angular/material';
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
  private sub: any;

  constructor(private locationService: LocationService, private route: ActivatedRoute, private router: Router) {

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
      if (this.type == "BUILDING" || this.type == "INDOOR") {
        var body = {
          "name": this.name,
          "type": this.type,
          "children": this.children
        };
        this.locationService
          .addLocationByParentId(this.parent._id, body)
          .subscribe(
            result => {
              this.parent = null;
              this.name = "";
              this.type = "";
            },
            error => this.errorMessage = error
          );
      }
      else {
        this.errorMessage = "Type has to be INDOOR or BUILDING";
      }
    }
    else {
      this.errorMessage = "Name and type cannot be empty.";
    }
    this.router.navigate(['/home']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}