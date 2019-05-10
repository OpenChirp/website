import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ErrorDialogService } from '../../services/error-dialog.service';

@Component({
  selector: 'update-config',
  templateUrl: './update-config.component.html',
  styleUrls: ['./update-config.component.scss']
})

export class UpdateConfigComponent {
  // Injected
  config: Array<any> = [];

  source: string;
  // Created
  newConfig: Array<any> = [];


  constructor(public dialog: MatDialogRef<UpdateConfigComponent>, private errorDialogService: ErrorDialogService) {

  }

  save() {
    for (let i = 0; i < this.config.length; i++ ) {
      this.newConfig.push({ key: this.config[i].key , value: this.config[i].value});
    }
    this.dialog.close(this.newConfig);
  }

  cancel() {
    this.dialog.close();
  }
}
