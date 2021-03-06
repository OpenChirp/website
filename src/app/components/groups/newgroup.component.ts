import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {ErrorDialogService} from '../../services/error-dialog.service';

@Component({
  selector: 'new-group',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.scss']
})

export class NewGroupComponent {
  // For Input
  name = '';

  constructor(public dialog: MatDialogRef<NewGroupComponent>, private errorDialogService: ErrorDialogService) {

  }

  save() {
    const group = {'name': this.name};
    this.dialog.close(group);
  }

  cancel() {
    this.dialog.close();
  }
}
