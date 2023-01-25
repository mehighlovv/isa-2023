import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService {

  private urlBase = "http://localhost:8080/api/users";

  constructor(private httpClient : HttpClient) {}
}
