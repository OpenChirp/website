import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-service',
  templateUrl: './userservice.component.html',
  styleUrls: ['./userservice.component.scss']
})

export class UserServiceComponent {
  service: any = null;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.getService();
  }

  getService() {
    this.route.params
      .switchMap((params: Params) => this.userService.getServiceByID(params['id']))
      .subscribe(
        result => this.service = result,
        error => this.router.navigate(['/home'])
      );
  }

}