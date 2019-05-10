import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';


import { Location } from '../../models/location';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-locations',
  templateUrl: './userlocations.component.html',
  styleUrls: ['./userlocations.component.scss']
})

export class UserLocationsComponent implements OnInit {
  locations: Array<Location> = [];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getMyLocations('').subscribe(
      result => this.locations = result,
      error => this.router.navigate(['/home'])
    );
  }

  gotoDevices(id: string) {
    this.router.navigate(['/home/devices/', id]);
  }

}
