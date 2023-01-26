import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUserRequest } from '../models/register-user-request';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { RegisteredUser } from '../models/registered-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase = 'http://localhost:8080/api/auth';
  private token: string | null = null;
  public loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(request: AuthenticationRequest): void {
    this.httpClient
      .post<AuthenticationResponse>(this.urlBase + '/login', request)
      .subscribe({
        next: (response) => this.emitLogin(response.token),
        error: () => alert('Username or password incorrect!'),
      });
  }
  register(request: RegisterUserRequest): void {
    this.httpClient
      .post<AuthenticationResponse>(this.urlBase + '/register', request)
      .subscribe({
        next: () => {
          alert(
            "An email with a link to activate your account will arrive on your email address shortly! You will be redirected to the login page so you can log in after you've activated your account."
          );
          this.router.navigate(['login']);
        },
        error: () => alert('You have to fill in all form fields!'),
      });
  }

  getToken() {
    this.token = localStorage.getItem('token') ?? null;
    this.token ? this.emitLogin(this.token) : null;
    return this.token;
  }

  getUserDetailsFromToken() {
    if (!this.token) {
      return;
    }
    return jwtDecode(this.token as string) as any;
  }

  getEmail() {
    return this.getUserDetailsFromToken()?.['sub'] ?? '';
  }

  emitLogin(token: string) {
    localStorage.setItem('token', token);
    this.router.navigate(['']);
    this.loggedIn$.next(true);
  }
  emitLogout() {
    localStorage.clear();
    this.loggedIn$.next(false);
    this.router.navigate(['']);
  }
}
