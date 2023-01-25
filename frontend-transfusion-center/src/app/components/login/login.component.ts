import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authRequest : AuthenticationRequest = {"email":"","password":""};
  constructor(private authService : AuthService, private router : Router){}

  login(){
    this.authService.login(this.authRequest).subscribe( 
      response =>{
        sessionStorage.setItem("token",response.token);
        this.router.navigate([""]);
      }
    )
  }

}
