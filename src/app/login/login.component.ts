import { Component } from '@angular/core';
import { MdInputModule } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  username: string;
  password: string;
  error: string;

  constructor(private router: Router) {
    this.username = "";
    this.password = "";
    this.error = "";
  }
  
  login() {
    if (this.username != "") {
      if (this.password == this.username) {
        this.router.navigate(['/dashboard']);
      }
      else {
        this.error = "WRONG PASSWORD";
      }
    }
  }
}
