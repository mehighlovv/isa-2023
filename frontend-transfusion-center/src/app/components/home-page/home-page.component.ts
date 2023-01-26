import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { RegisteredUser } from 'src/app/models/registered-user';
import { AuthService } from 'src/app/services/auth.service';
import { RegisteredUserService } from 'src/app/services/registered-user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  authenticated: boolean = false;
  registeredUser: RegisteredUser = {
    id: 0,
    email: '',
    password: '',
    name: '',
    lastname: '',
    address: '',
    city: '',
    country: '',
    occupation: '',
    companyInfo: '',
    loyaltyPoints: 0,
    gender: '',
    penalties: 0,
    phone: '',
    socialSecurityNumber: '',
    reservations: [],
    complaints: [],
    ratings: [],
    role: '',
    questionaire: undefined,
    enabled: false,
    accepted: false,
    accountNonLocked: false,
    authorities: [],
    username: '',
    accountNonExpired: false,
    credentialsNonExpired: false,
  };
  constructor(
    private authService: AuthService,
    private registeredUserService: RegisteredUserService
  ) {}
  ngOnInit() {
    this.checkIfAuthenticated();
  }

  checkIfAuthenticated() {
    this.authService.loggedIn$.subscribe((auth: boolean) => {
      if (auth) {
        this.authenticated = auth;
      }
    });
    if (this.authenticated) {
      this.registeredUserService.getUserByEmail().subscribe((response) => {
        this.registeredUser = response;
      });
    }
  }
}
