import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Device } from '../../models/device';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-services',
  templateUrl: './userservices.component.html',
  styleUrls: ['./userservices.component.scss']
})

export class UserServicesComponent {
  services: Array<any> = [];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getMyServices("").subscribe(
      result => this.services = result,
      error => this.router.navigate(['/home'])
    );
  }

  gotoService(id: string) {
    this.router.navigate(['/home/service/', id]);
  }
}