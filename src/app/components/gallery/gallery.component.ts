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
const base_url = '../../../assets/images/gallery/';

const PICS: Image[] = [
  { url: base_url + '1.jpg' },
  { url: base_url + '2.jpg' },
  { url: base_url + '3.jpg' },
  { url: base_url + '4.jpg' },
  { url: base_url + '5.jpg' },
  { url: base_url + '6.jpg' },
  { url: base_url + '7.jpg' },
  { url: base_url + '8.jpg' },
  { url: base_url + '9.jpg' },
  { url: base_url + '10.jpg' },
  { url: base_url + '11.jpg' },
  { url: base_url + '12.jpg' },
];



