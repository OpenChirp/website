import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-dialog',
  template: `
    <div class="success">
      <md-icon>check_circle</md-icon>
      <h3 md-dialog-title> Success </h3>
      <p>
        {{ message }}
      </p>
    </div>
  `,
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {
  public message: string;

  constructor() { }

  ngOnInit() {
  }

}
