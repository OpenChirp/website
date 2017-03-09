import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'new-location',
  templateUrl: './newlocation.component.html'
})

export class NewLocationComponent {
  constructor(public dialogRef: MdDialogRef<NewLocationComponent>) {

  }
}