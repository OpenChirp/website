import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-snackbar',
  template: `
    <span class="error">
      <md-icon>report_problem</md-icon>
      error
      <!--<h3 md-dialog-title> Error </h3>-->
      <!--<p>-->
        <!--{{ message }}-->
      <!--</p>-->
    </span>
  `,
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
