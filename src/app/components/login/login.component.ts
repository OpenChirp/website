import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MdInputModule, MdSnackBar, MdDialog } from '@angular/material';

import { SuccessDialogService } from '../../services/success-dialog.service';
import { ErrorDialogService } from '../../services/error-dialog.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  email: string = '';
  name: string = '';
  password: string = '';
  confirmPassword: string = '';
  showSignup: boolean = false;
  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private router: Router,
              private authService: AuthService,
              private errorDialogService: ErrorDialogService,
              private successDialogService: SuccessDialogService,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
  }

  login() {
    if (this.email != '' && this.password != '') {
      var body: any = {
        username: this.email,
        password: this.password
      };
      this.authService.basicLogin(body).subscribe(
        result => {
          //this.router.navigate(['/home'])
          window.location.href = '/home';
        }, error => {
          this.errorDialogService
            .dialogPopup(error.message);
        }
      );
    }
    else {
      this.snackBar.open('Email or password are empty!', 'ERROR', {duration: 2000});
    }
  }

  signup() {
    if (!this.showSignup) {
      this.showSignup = true;
    } else {
      if (this.email != '' && this.password != '') {
        var body: any = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        // TODO : use proper angular FormControl to leverage angular 4 validation and whatnot
        let regexp = new RegExp(this.emailPattern);
        if (!regexp.test(this.email)) {
          this.errorDialogService.dialogPopup('Invalid Email');
          return;
        }
        if (this.password === this.confirmPassword) {
          this.authService.signup(body).subscribe(
            createdUser => {
              this.successDialogService.dialogPopup('Signup Successful ' + this.email).subscribe(
                result => {
                  this.login();
                } // Call login to setup session and then redirect to home
              )
            },
            error => {
              this.errorDialogService.dialogPopup(error.message);
            }
          );
        } else {
          this.errorDialogService.dialogPopup('Passwords do not match !');
        }
      } else {
        this.snackBar.open('Email or password are empty!', 'ERROR', {duration: 2000});
      }
    }
  }
}
