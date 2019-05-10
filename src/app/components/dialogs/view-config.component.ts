import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {ErrorDialogService} from '../../services/error-dialog.service';

@Component({
  selector: 'view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.scss']
})

export class ViewConfigComponent {
  // Injected
  config: Array<any> = [];

  source: string;


  constructor(public dialog: MatDialogRef<ViewConfigComponent>, private errorDialogService: ErrorDialogService) {

  }

  cancel() {
    this.dialog.close();
  }
}
