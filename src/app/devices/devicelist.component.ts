import { Component, Input } from '@angular/core';
import { Device } from '../resources/device';

@Component({
  selector: 'device-list',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.scss']
})

export class DeviceListComponent {
  @Input() devices: Array<Device> = [];
  constructor() {

  }
}