import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Device } from '../resources/device';
import { DeviceService } from '../resources/device.service';

@Component({
  selector: 'device-info',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

export class DeviceComponent {
  device: Device = null;
  errorMessage: string = "";
  successMessage: string="";

  constructor(private route: ActivatedRoute, private router: Router, private deviceService: DeviceService) {

  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.deviceService.getDeviceById(params['id']))
      .subscribe(
        result => this.device = result,
        error => this.errorMessage = error
      );
  }

  updateDevice() {
    this.deviceService.updateDeviceById(this.device._id, this.device).subscribe(
      result => {
        this.successMessage = "Updated!";
        this.router.navigate(['/home/device/', this.device._id]);
      },
      error => this.errorMessage = error
    );
  }

}