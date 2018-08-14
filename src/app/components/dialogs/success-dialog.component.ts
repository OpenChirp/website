import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-dialog',
  template: `
    <div class="success" align="center">
      <mat-icon>check_circle</mat-icon>
      <h3 mat-dialog-title> Success </h3>
      <p>
        {{ message }}
        <br>
        {{ tip }}
      </p>
    </div>
  `,
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {
  public message: string;
  public tip :string;
  constructor() { }

  ngOnInit() {
  }

}
