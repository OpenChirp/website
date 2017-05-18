import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';

import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'select-template',
  templateUrl: 'select-template.component.html',
  styleUrls: ['select-template.component.scss']
})

export class SelectTemplateComponent {
  templates: Array<Object> = [];

  constructor(private router: Router, private deviceService: DeviceService, public dialogRef: MdDialogRef<SelectTemplateComponent>) {
    
  }

  ngOnInit() {
    this.deviceService.deviceTemplates().subscribe(
      result => this.templates = result,
      error => console.log(error.message)
    );
  }

  select(template: any) {
    console.log(template.name);
    this.dialogRef.close(template);
  }

}