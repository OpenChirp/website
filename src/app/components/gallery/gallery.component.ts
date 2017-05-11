import { Component } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  public pics = PICS;

  constructor () { };
}

const PICS: Image[] = [
  { title: 'test', url: 'google.com' }
];



