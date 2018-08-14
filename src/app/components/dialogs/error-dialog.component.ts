import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  template: `
    <div class="error" align="center">
      <mat-icon>report_problem</mat-icon>
      <h3 mat-dialog-title> Error </h3>
      <p>
        {{ message }}
      </p>
    </div>
  `,
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  public message: string;

  constructor() { }

  ngOnInit() {
  }

}
