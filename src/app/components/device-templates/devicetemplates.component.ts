import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../services/device.service';
import {Router} from '@angular/router';

@Component({
  selector: 'device-templates',
  templateUrl: './devicetemplates.component.html',
  styleUrls: ['devicetemplates.component.scss']
})

export class DeviceTemplatesComponent implements OnInit {

  templates: Array<Object> = [];

  constructor(private deviceService: DeviceService, private router: Router) {

  }

  ngOnInit() {
    this.deviceService.deviceTemplates().subscribe(
      result => this.templates = result,
      error => console.log(error.message)
    );
  }

  gotoTemplate(id: string) {
    this.router.navigate(['/home/devicetemplate/', id]);
  }

}
