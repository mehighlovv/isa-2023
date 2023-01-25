import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserRequest } from 'src/app/models/register-user-request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerUserRequest : RegisterUserRequest = {
    "email":"",
    "password":"",
    "name":"",
    "lastname":"",
    "address":"",
    "city":"",
    "country":"",
    "phone":"",
    "socialSecurityNumber":"",
    "gender":"",
    "occupation":"",
    "companyInfo":""
  }
  constructor(private authService : AuthService, private router : Router){}

  register(){
    this.authService.register(this.registerUserRequest).subscribe( 
      response =>{
        sessionStorage.setItem("token",response.token);
        this.router.navigate([""]);
      }
    )
  }
}
