import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ErrorDialogService } from '../../services/error-dialog.service';

@Component({
  selector: 'input-config',
  templateUrl: './input-config.component.html',
  styleUrls: ['./input-config.component.scss']
})

export class InputConfigComponent {
  // Injected
  configRequired: Array<any> = [];

  source: string;
  // Created
  newConfig: Array<any> = [];


  constructor(public dialog: MatDialogRef<InputConfigComponent>, private errorDialogService: ErrorDialogService) {
  }

  save() {
    for (let i = 0; i < this.configRequired.length; i++ ) {
      this.newConfig.push({ key: this.configRequired[i].key_name , value: this.configRequired[i].value});
    }
    this.dialog.close(this.newConfig);
  }

  cancel() {
    this.dialog.close();
  }
}
