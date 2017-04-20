import { Component } from '@angular/core';
import { MdInputModule, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '../resources/location';
import { LocationService } from '../resources/location.service';

@Component({
  selector: 'new-device',
  templateUrl: './newdevice.component.html',
  styleUrls: ['./newdevice.component.scss']
})
export class NewDeviceComponent {
  location: Location = null;
  name: string = "";

  constructor(private locationService: LocationService, private route: ActivatedRoute, private router: Router, public snackBar: MdSnackBar) {

  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.locationService.getLocationById(params['id']))
      .subscribe(
        result => this.location = result,
        error => {
          this.router.navigate(['/home']);
        }
      );
  }
}