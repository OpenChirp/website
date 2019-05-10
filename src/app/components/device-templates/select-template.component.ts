import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'select-template',
  templateUrl: 'select-template.component.html',
  styleUrls: ['select-template.component.scss']
})

export class SelectTemplateComponent {
  templates: Array<any> = [];
  searchTerm: string = "";

  constructor(private router: Router, private deviceService: DeviceService, public dialogRef: MatDialogRef<SelectTemplateComponent>) {

  }

  ngOnInit() {
    this.deviceService.deviceTemplates().subscribe(
      result => this.templates = result,
      error => console.log(error.message)
    );
  }

  select(template: any) {
    this.dialogRef.close(template);
  }

  filtered() {
    if (this.searchTerm != "") {
      return this.templates.filter((x) => {
        if (typeof(x.name) == "string" && typeof(x.description == "string") && typeof(x.owner == "string")) {
          const template_name: string = x.name;
          const name_match = template_name.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (name_match) return true;

          if(x.description){
            const template_description: string = x.description;
            const description_match = template_description.toLowerCase().includes(this.searchTerm.toLowerCase());
            if (description_match) return true;
          }
          if (x.owner.name) {
            var template_owner: string = x.owner.name;
            var owner_match = template_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
          }
          else {
            var template_owner: string = x.owner.email;
            var owner_match = template_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
          }
          if (owner_match) return true;
        }
        return false;
      });
    }
    else {
      return this.templates;
    }
  }

}
