import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Configuration } from '../../config';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})

export class SplashComponent implements OnInit {
  title = 'OpenChirp';
  isScrolled = false;
  delta = 100;
  login_url: string;
  logged_in: boolean;

  constructor(@Inject(DOCUMENT) private doc: any, private config: Configuration, private userService: UserService) {
    this.login_url = config.google_auth;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      result => this.logged_in = true,
      error => this.logged_in = false
    );
  }

  is_logged_in() {
    this.userService.getUser().subscribe(
      result => {
        return true;
      },
      error => {
        return false;
      }
    );
  }

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
