import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Device } from '../../models/device';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'user-devices',
  templateUrl: './userdevices.component.html',
  styleUrls: ['./userdevices.component.scss']
})

export class UserDevicesComponent {
  devices: Array<Device> = [];
  errorMessage = "";
  location: Location = null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getMyDevices("").subscribe(
      result => this.devices = result,
      error => this.router.navigate(['/home'])
    );
  }

  gotoDevice(id: string) {
    this.router.navigate(['/home/device/', id]);
  }

  gotoLocation(id: string) {
    if (id) {
      this.router.navigate(['/home/devices/', id]);
    }
  }

  newDevice() {
    this.router.navigate(['/home/newdevice']);
  }

}