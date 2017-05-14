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
  { title: 'test', url: base_url + '1.jpg' },
  { title: 'test', url: base_url + '2.jpg' },
  { title: 'test', url: base_url + '3.jpg' },
  { title: 'test', url: base_url + '4.jpg' },
  { title: 'test', url: base_url + '5.jpg' },
  { title: 'test', url: base_url + '6.jpg' },
  { title: 'test', url: base_url + '7.jpg' },
  { title: 'test', url: base_url + '8.jpg' },
  { title: 'test', url: base_url + '9.jpg' },
  { title: 'test', url: base_url + '10.jpg' },
  { title: 'test', url: base_url + '11.jpg' },
  { title: 'test', url: base_url + '12.jpg' },
];



