import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'user-services',
  templateUrl: './userservices.component.html',
  styleUrls: ['./userservices.component.scss']
})

export class UserServicesComponent implements OnInit {
  services: Array<any> = [];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getMyServices('').subscribe(
      result => this.services = result,
      error => this.router.navigate(['/home'])
    );
  }

  gotoService(id: string) {
    this.router.navigate(['/home/service/', id]);
  }
}
