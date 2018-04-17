import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Configuration } from '../../config';
import { UserService } from '../../services/user.service';
import { GalleryComponent } from '../gallery/gallery.component';
import {LoginComponent} from '../login/login.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})

export class SplashComponent implements OnInit {
  title = 'OpenChirp';
  isScrolled = false;
  delta = 100;
  logged_in: boolean;
  splash_map_src: SafeResourceUrl;

  constructor(@Inject(DOCUMENT) private doc: any,
              private config: Configuration,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              public dialog: MdDialog) {
   
  }

  ngOnInit() {
    this.splash_map_src = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.splash_map_url);
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

  loginPopup(service: any) {
    let dialogRef = this.dialog.open(LoginComponent, {width: '450px'});
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
