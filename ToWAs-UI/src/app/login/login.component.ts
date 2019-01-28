import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuthenticated().then((res) => {
      if (res.authenticated) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  async submitLogin() {

    const asyncLogin = () => {
      return new Promise(async (resolve) => {
        //@ts-ignore
        window.FB.login((response) => {
          resolve(response);
        });
      });
    }

    const loginResponse:any = await asyncLogin();
    console.log(loginResponse);

    if (loginResponse.authResponse) {
      this.router.navigate(['dashboard'])
    } else {
      console.log('User login failed');
    }

    return;

  }

}
