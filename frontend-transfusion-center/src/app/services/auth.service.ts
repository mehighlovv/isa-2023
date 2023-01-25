import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUserRequest } from '../models/register-user-request';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = "http://localhost:8080/api/auth";

  constructor(private httpClient : HttpClient) {}

  login(request : AuthenticationRequest): Observable<AuthenticationResponse>{
      return this.httpClient.post<AuthenticationResponse>(this.urlBase+"/login",request);
  }
  register(request : RegisterUserRequest): Observable<AuthenticationResponse>{
    return this.httpClient.post<AuthenticationResponse>(this.urlBase+"/register",request);
  }

  getToken(){
    return sessionStorage.getItem("token") ?? "";
  }

  getUserDetailsFromToken(){
    try{
      return jwtDecode(this.getToken()) as any;
    }catch(Error){
      return null;
    }
  }
}
