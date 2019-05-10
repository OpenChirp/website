import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ErrorDialogService } from '../../services/error-dialog.service';

@Component({
  selector: 'config-required',
  templateUrl: './config.required.component.html',
  styleUrls: ['./config.required.component.scss']
})

export class ConfigRequiredComponent {
  // Injected
  config: Array<any> = [];
  source: string;
  // Created
  newConfig: Array<any> = [];
  transformed: Array<any> = [];

  // For Input
  newKeyName = '';
  newKeyDescription = '';
  newKeyExample = '';
  newKeyRequired = false;

  constructor(public dialog: MatDialogRef<ConfigRequiredComponent>, private errorDialogService: ErrorDialogService) {

  }

  ngOnInit() {

    for (let i = 0; i < this.config.length; i++) {
      this.transformed.push({ keyName: this.config[i].key_name, keyDescription: this.config[i].key_description, keyExample: this.config[i].key_example, keyRequired: this.config[i].key_required,  edit: false });
    }
    this.newConfig = this.config;
  }

  add() {
    if (this.newConfig.hasOwnProperty(this.newKeyName)) {
      this.errorDialogService.dialogPopup('Key Already Exists!');
    } else {
      this.transformed.push({ keyName: this.newKeyName, keyDescription: this.newKeyDescription, keyExample: this.newKeyExample, keyRequired: this.newKeyRequired,  edit: false });
      this.newConfig.push({ key_name: this.newKeyName, key_description: this.newKeyDescription, key_example: this.newKeyExample, key_required: this.newKeyRequired });
      this.newKeyName = '';
      this.newKeyDescription = '';
      this.newKeyExample = '';
      this.newKeyRequired = false;
    }
  }

  remove(index: number) {
    this.newConfig.splice(index, 1);
    this.transformed.splice(index, 1);
  }

  edit(index: number) {
    this.transformed[index].edit = true;
  }

  edited(index: number) {
    this.newConfig[index] = this.transformed[index];
    this.transformed[index].edit = false;
  }

  save() {
    this.dialog.close(this.newConfig);
  }

  cancel() {
    this.dialog.close();
  }
}
