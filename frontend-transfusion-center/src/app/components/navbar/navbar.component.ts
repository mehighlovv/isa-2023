import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  email: string = '';
  authenticated: boolean = false;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkIfAuthenticated();
  }
  logout() {
    this.email = '';
    this.authService.emitLogout();
  }
  checkIfAuthenticated() {
    this.authService.loggedIn$.subscribe((auth: boolean) => {
      if (auth) {
        this.initEmail();
        setTimeout(() => {
          this.authenticated = true;
        }, 500);
        return;
      }
      this.authenticated = false;
    });
  }
  initEmail() {
    this.email = this.authService.getUserDetailsFromToken()?.['sub'] ?? '';
  }
}
