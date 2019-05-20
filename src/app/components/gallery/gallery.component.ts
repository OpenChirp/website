import {Component} from '@angular/core';
import {Image} from '../../models/image';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent {
  base_url = '../../../assets/images/gallery/';
  pics: Image[] = [
    {url: this.base_url + '1.jpg'},
    {url: this.base_url + '2.jpg'},
    {url: this.base_url + '3.jpg'},
    {url: this.base_url + '4.jpg'},
    {url: this.base_url + '5.jpg'},
    {url: this.base_url + '6.jpg'},
    {url: this.base_url + '7.jpg'},
    {url: this.base_url + '8.jpg'},
    {url: this.base_url + '9.jpg'},
    {url: this.base_url + '10.jpg'},
    {url: this.base_url + '11.jpg'},
    {url: this.base_url + '12.jpg'},
  ];

  constructor() {
  };
}
