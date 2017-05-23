import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ErrorDialogService } from '../../services/error-dialog.service';

@Component({
  selector: 'properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})

export class PropertiesComponent {
  // Injected
  properties: Object = {};
  source: string = "";

  // Created
  newProperties: Object = {};
  transformed: Array<any> = [];
  
  // For Input
  newKey: string = "";
  newValue: string = "";

  constructor(public dialog: MdDialogRef<PropertiesComponent>, private errorDialogService: ErrorDialogService) {

  }

  ngOnInit() {
    let keys = Object.keys(this.properties);
    for (let i = 0; i < keys.length; i++) {
      this.transformed.push({ key: keys[i], value: this.properties[keys[i]], edit: false });
    }
    this.newProperties = this.properties;
  }

  add() {
    if (this.newProperties.hasOwnProperty(this.newKey)) {
      this.errorDialogService.dialogPopup("Key Already Exists!");
    }
    else {
      this.transformed.push({ key: this.newKey, value: this.newValue, edit: false });
      this.newProperties[this.newKey] = this.newValue;
      this.newKey = "";
      this.newValue = "";
    }
  }

  remove(index: number) {
    delete this.newProperties[this.transformed[index].key];
    this.transformed.splice(index, 1);
  }

  edit(index: number) {
    this.transformed[index].edit = true;
  }

  edited(index: number) {
    this.newProperties[this.transformed[index].key] = this.transformed[index].value;
    this.transformed[index].edit = false;
  }

  save() {
    this.dialog.close(this.newProperties);
  }

  cancel() {
    this.dialog.close();
  }
}