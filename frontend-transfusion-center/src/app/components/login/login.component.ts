import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.authRequest);
  }
}
