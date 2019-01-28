import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  async logout() {

    const asyncLogout = () => {
      return new Promise(async (resolve) => {
        //@ts-ignore
        window.FB.logout((response) => {
          resolve(response);
        });
      });
    }
    
    const logoutResponse:any = await asyncLogout();
    console.log(logoutResponse);

    if (logoutResponse.authResponse) {
      this.router.navigate(['login'])
    } else {
      console.log('There has been an error logging out the user');
    }

    return;
  }

}
