import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material';

import {SuccessDialogService} from '../../services/success-dialog.service';
import {ErrorDialogService} from '../../services/error-dialog.service';
import {Configuration} from '../../config';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  name = '';
  password = '';
  confirmPassword = '';
  showSignup = false;
  showSignupButton = false;
  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private config: Configuration,
              private router: Router,
              private authService: AuthService,
              private errorDialogService: ErrorDialogService,
              private successDialogService: SuccessDialogService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.showSignupButton = this.config.signup_enable;
  }

  login() {
    if (this.emailFormControl.value !== '' && this.password !== '') {
      const body: any = {
        username: this.emailFormControl.value,
        password: this.password
      };
      this.authService.basicLogin(body).subscribe(
        result => {
          // this.router.navigate(['/home'])
          window.location.href = '/home';
        }, error => {
          this.errorDialogService
            .dialogPopup(error.message);
        }
      );
    } else {
      this.snackBar.open('Email or password are empty!', 'ERROR', {duration: 2000});
    }
  }

  signup() {
    if (!this.showSignup) {
      this.showSignup = true;
    } else {
      if (this.emailFormControl.value !== '' && this.password !== '') {
        const body: any = {
          name: this.name,
          email: this.emailFormControl.value,
          password: this.password
        };
        const regexp = new RegExp(this.emailPattern);
        if (!regexp.test(this.emailFormControl.value)) {
          this.errorDialogService.dialogPopup('Invalid Email');
          return;
        }
        if (this.password === this.confirmPassword) {
          this.authService.signup(body).subscribe(
            createdUser => {
              this.successDialogService.dialogPopup('Signup Successful ' + this.emailFormControl.value).subscribe(
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
