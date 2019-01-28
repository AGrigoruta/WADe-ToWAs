import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FB } from '../FB.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  submitLogin() {
    //@ts-ignore
    window.FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        setTimeout(() => {
          this.router.navigate(['dashboard'])
        }, 250);
      }
      else {
        console.log('User login failed');
      }
    });
  }

}
