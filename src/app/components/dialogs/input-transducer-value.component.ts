import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ErrorDialogService } from '../../services/error-dialog.service';

@Component({
  selector: 'input-transducer-value',
  templateUrl: './input-transducer-value.component.html',
  styleUrls: ['./input-transducer-value.component.scss']
})

export class InputTransducerValueComponent {
  // Injected
  transducerName = '';
  valueOriginal = '';
  valueNew = '';


  constructor(
    public dialog: MatDialogRef<InputTransducerValueComponent>,
    private errorDialogService: ErrorDialogService) {
  }

  publish() {
    this.dialog.close(this.valueNew);
  }

  cancel() {
    this.dialog.close();
  }
}
