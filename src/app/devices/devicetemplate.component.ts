import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DeviceService } from '../resources/device.service';

@Component({
  selector: 'device-template',
  templateUrl: './devicetemplate.component.html',
  styleUrls: ['./devicetemplate.component.scss']
})

export class DeviceTemplateComponent {
  template: any = null;
  constructor(private route: ActivatedRoute, private deviceService: DeviceService, private router: Router) {

  }

  ngOnInit() {
    this.getTemplate();
  }

  getTemplate() {
    this.route.params
      .switchMap((params: Params) => this.deviceService.deviceTemplate(params['id']))
      .subscribe(
        result => {
          this.template = result;
        },
        error => this.router.navigate(['/home'])
      );
  }
  newDevice() {
    this.router.navigate(['/home/newdevice', { template_id: this.template._id }]);
  }

}