import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { InfraService } from '../../services/infraservice';

@Component({
  selector: 'user-service',
  templateUrl: './userservice.component.html',
  styleUrls: ['./userservice.component.scss']
})

export class UserServiceComponent {
  service: any = null;
  constructor(private route: ActivatedRoute, private infraService: InfraService, private router: Router) {

  }

  ngOnInit() {
    this.getService();
  }

  getService() {
    this.route.params
      .switchMap((params: Params) => this.infraService.getServiceByID(params['id']))
      .subscribe(
        result => this.service = result,
        error => this.router.navigate(['/home'])
      );
  }

}