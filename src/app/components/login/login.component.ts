import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(private router: Router,
             private authService: AuthService,
             private errorDialogService: ErrorDialogService) {

  }
  ngOnInit() {
  }
  login() {

  }

  
 
}
