import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

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
  
  frameURL: SafeUrl = []
   
constructor(private deviceService: DeviceService,  private sanitizer: DomSanitizer) {

  }

 ngOnInit() {
   let grafana_url = this.deviceService.getGrafanaUrl();
   let transducerNames = this.device.transducers.map(function(val:any) { return val.name ;});
  let url = grafana_url +"dashboard/script/transducer.js?device="+this.device._id+"&transducers="+transducerNames.join()+"&theme=light&kiosk=true";
  this.frameURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
}