import {Component, HostListener, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})

export class SplashComponent implements OnInit {
  title = 'OpenChirp';
  isScrolled = false;
  delta = 100;

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onScroll() {
    const number = this.doc.body.scrollTop;
    if (number > this.delta) {
      this.isScrolled = true;
    } else if (this.isScrolled && number < 10) {
      this.isScrolled = false;
    }
  }
}
