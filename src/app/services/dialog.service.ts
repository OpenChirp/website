import { Observable } from 'rxjs/Rx';
import { SuccessDialogComponent } from '../components/success-dialog/success-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public success(message: string): Observable<boolean> {
    let dialogRef: MdDialogRef<SuccessDialogComponent>;

    dialogRef = this.dialog.open(SuccessDialogComponent);
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

}
