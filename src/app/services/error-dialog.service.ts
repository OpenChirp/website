import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog } from '@angular/material';

@Injectable()
export class ErrorDialogService {

  constructor(private dialog: MdDialog) { }

  /**
   * Opens a fail dialog
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
    }, 1000);
    return dialogRef.afterClosed();
  }

}
