import { Component, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from '@angular/router';
import { Configuration } from '../../config';
import { AuthService } from '../../services/auth.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<div class="g-signin2" id="googleBtn"></div>'
})
export class GoogleLoginComponent implements AfterViewInit{
  public auth2: any;
  public clientId: string;
  constructor(private config: Configuration,
              private router: Router,
             private authService: AuthService,
             private errorDialogService: ErrorDialogService) {
    this.clientId = config.google_auth_client_id;

  }

  ngAfterViewInit() {
    this.googleInit();
    this.renderButton();
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        //cookiepolicy: 'single_host_origin',
        scope: 'email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        //let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token
        let body = {"id_token" : token };
        this.authService.googleLogin(body).subscribe(
            res => {
               // this.router.navigate(['/home']);
              window.location.href='/home';
              },
            err => this.errorDialogService.dialogPopup(err.message)
            )
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  public renderButton() {
    gapi.signin2.render('googleBtn', {
      'scope': 'email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
  }


}
