import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Device } from '../../models/device';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-locations',
  templateUrl: './userlocations.component.html',
  styleUrls: ['./userlocations.component.scss']
})

export class UserLocationsComponent {
  locations: Array<Location> = [];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getMyLocations("").subscribe(
      result => this.locations = result,
      error => this.router.navigate(['/home'])
    );
  }

  gotoDevices(id: string) {
    this.router.navigate(['/home/devices/', id]);
  }

}