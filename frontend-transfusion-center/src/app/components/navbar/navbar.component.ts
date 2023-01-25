import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  email : string = "";
  isLoggedIn : boolean = this.email!="";
  
  constructor(private authService : AuthService,private router : Router ){}

  ngOnInit(){
    this.email=this.authService.getUserDetailsFromToken()["sub"];
    this.isLoggedIn=true;
  }
  logout(){
    sessionStorage.clear();
    this.email="";
    this.isLoggedIn=false;
    this.router.navigate([""]);
  }
}
