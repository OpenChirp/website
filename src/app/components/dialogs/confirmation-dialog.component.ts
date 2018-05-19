import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})

export class ConfirmationDialogComponent {
  dialogText: string = "";
  dialogWarning: string = "";
  confirmText: string = "";

  constructor(public dialog: MatDialogRef<ConfirmationDialogComponent>) {

  }

  confirmDialog() {
    this.dialog.close(true);
  }

  denyDialog() {
    this.dialog.close(false);
  }
}
