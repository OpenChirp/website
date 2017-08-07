import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-profile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})

export class UserProfileComponent {
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