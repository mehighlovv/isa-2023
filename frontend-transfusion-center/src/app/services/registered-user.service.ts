import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisteredUser } from '../models/registered-user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegisteredUserService {
  private urlBase = 'http://localhost:8080/api/users';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getUserByEmail(): Observable<RegisteredUser> {
    return this.httpClient.get<RegisteredUser>(
      this.urlBase + '/' + this.authService.getEmail(),
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.getTokenWithoutRedirect()?.toString(),
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
