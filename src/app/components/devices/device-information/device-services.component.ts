import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'device-services',
  templateUrl: './device-services.component.html',
  styleUrls: ['./device-services.component.scss']
})

export class DeviceServicesComponent {
  @Input() services: Array<Object>;

  constructor(private router: Router) {

  }
  
  toService(id: string) {
    this.router.navigate(['/home/service/', id]);
  }

}