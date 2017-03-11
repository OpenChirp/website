import { Component, Input } from '@angular/core';
import { Location } from '../resources/location';
import { MdInputModule } from '@angular/material';

@Component({
  selector: 'new-location',
  templateUrl: './newlocation.component.html',
  styleUrls: ['./newlocation.component.scss']
})

export class NewLocationComponent {
  @Input() parent: Location = null;
  name: string = "";
  type: string = "";
  children: Array<string> = [];
  types = [
    {value: 'BUILDING', viewValue: 'Building'},
    {value: 'INDOOR', viewValue: 'Indoor'}
  ];
  constructor() {

  }
  
  cancel() {
    this.parent = null;
  }
}