import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})

export class ConfirmationDialogComponent {
  dialogText: string = "";
  confirmText: string = "";
  
  constructor(public dialog: MdDialogRef<ConfirmationDialogComponent>) {
    
  }

  confirmDialog() {
    this.dialog.close(true);
  }

  denyDialog() {
    this.dialog.close(false);
  }
}