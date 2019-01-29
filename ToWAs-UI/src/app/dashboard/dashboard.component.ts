import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string;
  profile_picture: any;
  sidebar_active:boolean = false;

  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.getUserDetails();
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

  getUserDetails() {
    this.auth.isAuthenticated().then((res) => {
      if (res) {
        //@ts-ignore
        window.FB.api('/me', {fields: ['first_name', 'picture']}, (response) => {
          console.log(response);
          this.profile_picture = response.picture ? response.picture.data : {};
          this.name = response.first_name;
        });  
      } else {
        this.router.navigate(['login']);
      }
    })
  }

  openSidebar() {
    this.sidebar_active = !this.sidebar_active;
  }

}
