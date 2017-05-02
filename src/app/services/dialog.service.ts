import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  /**
   * Opens a success/fail dialog
   * @param d       dialog component
   * @param message corresponding message
   * @returns {Observable<any>}
   */
  public dialogPopup(d, message: string): Observable<boolean> {
    let dialogRef: MdDialogRef<any>;

    dialogRef = this.dialog.open(d);
    dialogRef.componentInstance.message = message;
    setTimeout(() => {
      dialogRef.close();
    }, 700);
    return dialogRef.afterClosed();
  }

}
