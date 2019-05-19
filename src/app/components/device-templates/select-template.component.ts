import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';

import {DeviceService} from '../../services/device.service';

@Component({
  selector: 'select-template',
  templateUrl: 'select-template.component.html',
  styleUrls: ['select-template.component.scss']
})

export class SelectTemplateComponent implements OnInit {
  templates: Array<any> = [];
  searchTerm = '';

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
    if (this.searchTerm !== '') {
      return this.templates.filter((x) => {
        let owner_match;
        let template_owner = '';
        if (typeof (x.name) === 'string' && typeof (x.description === 'string') && typeof (x.owner === 'string')) {
          const template_name: string = x.name;
          const name_match = template_name.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (name_match) {
            return true;
          }

          if (x.description) {
            const template_description: string = x.description;
            const description_match = template_description.toLowerCase().includes(this.searchTerm.toLowerCase());
            if (description_match) {
              return true;
            }
          }
          if (x.owner.name) {
            template_owner = x.owner.name;
            owner_match = template_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
          } else {
            template_owner = x.owner.email;
            owner_match = template_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
          }
          if (owner_match) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.templates;
    }
  }

}
