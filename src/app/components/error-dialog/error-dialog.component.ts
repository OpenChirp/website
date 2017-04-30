import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  template: `
    <div class="error">
      <md-icon>report_problem</md-icon>
      <h3 md-dialog-title> Error </h3>
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
