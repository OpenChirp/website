import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { MdButtonToggleGroup } from '@angular/material';

import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';

@Component({
  selector: 'device-visualization',
  templateUrl: './device-visualization.component.html',
  styleUrls: ['./device-visualization.component.scss']
})

export class DeviceVisualizationComponent {
  @Input() device: Device;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
  deviceTransducers: Array<any>;
  frameURL: SafeUrl = [];
  currentRes: 'Hour';
  resOptions = [
    'Year',
    'Month',
    'Day',
    'Hour'
  ];
  constructor(private deviceService: DeviceService,  private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.deviceTransducers = this.device.transducers.slice(); //  Shallow copy workaround for odd rendering issue
    this.deviceTransducers.forEach((td) => {
      td['checked'] = true;
    });
    this.currentRes = 'Hour';
    this.optionToggled();
  }

  optionToggled() {
    let grafana_url = this.deviceService.getGrafanaUrl();
    let enabledTransducers = [];
    for (let td of this.deviceTransducers) {
      if (td['checked']) {
        enabledTransducers.push(td['name']);
      }
    }
    let url = grafana_url +"dashboard/script/transducer_v2.js?device="+this.device._id+"&transducers="+enabledTransducers.join()+"&theme=light&kiosk=true"
    switch(String(this.currentRes)) {
      case ("Year"):
        url = url + "&refresh=15m&from=now-1y&to=now%2B1M";
        break;
      case 'Month':
        url = url + "&refresh=5m&from=now-1M&to=now%2B1d";
        break;
      case 'Day':
        url = url + "&refresh=1ms&from=now-1d&to=now%2B1h";
        break;
      case 'Hour':
        url = url + "&refresh=15s&from=now-1h&to=now%2B5m";
        break;
      default:
        url = url + "&refresh=15s&from=now-1h&to=now%2B5m";
    }

    this.frameURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    // let grafana_url = this.deviceService.getGrafanaUrl();
    // let transducerNames = this.device.transducers.map(function(val:any) { return val.name ;});
    // let url = grafana_url +"dashboard/script/transducer_v2.js?device="+this.device._id+"&transducers="+transducerNames.join()+"&theme=light&kiosk=true&refresh=15s&from=now-1h&to=now%2B10m";
    // //   this.frameURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log(url);
  }
}
