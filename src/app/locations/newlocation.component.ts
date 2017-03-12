import { Component, Input } from '@angular/core';
import { Location } from '../resources/location';
import { MdInputModule } from '@angular/material';
import { LocationService } from '../resources/location.service';

@Component({
  selector: 'new-location',
  templateUrl: './newlocation.component.html',
  styleUrls: ['./newlocation.component.scss']
})

export class NewLocationComponent {
  @Input() parent: Location = null;
  name: string = "";
  type: string = "";
  children: Array<string> = [];
  errorMessage: string = "";

  constructor(private locationService: LocationService) {

  }

  add() {
    if (this.name != "" && this.type != "") {
      if (this.type == "BUILDING" || this.type == "INDOOR") {
        var body = {
          "name": this.name,
          "type": this.type,
          "children": this.children
        };
        console.log(body);
        this.locationService
          .addLocationByParentId(this.parent._id, body)
          .subscribe(
            result => console.log(result),
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

  }

  cancel() {
    this.parent = null;
  }
}