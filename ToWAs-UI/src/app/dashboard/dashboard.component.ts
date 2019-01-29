import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { ModalComponent } from './modal/modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string;
  profile_picture: any;
  sidebar_active:boolean = false;
  bsModalRef: BsModalRef

  constructor(
    public router: Router,
    public auth: AuthService,
    public api: DataService,
    private user: UserService,
    private modalService: BsModalService
    ) {
      this.modalService.onHidden.subscribe((resp) => { this.handleDismiss(); });
    }

  ngOnInit() {
    this.getUserDetails();
    // this.getValues();
  }

  getValues() {
    this.api.getValues().subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
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

  handleDismiss() {
    if (this.bsModalRef.content.dismissed === false) {
      console.log(this.user.getPosition(), this.user.getTest());
      console.log('sending data');
    }
  }

  openForm() {
    const initialState = {
      dismissed: true,
      selectList: [
        {key: '1', value: 'Option 1'},
        {key: '2', value: 'Option 2'},
        {key: '3', value: 'Option 3'},
        {key: '4', value: 'Option 4'}
      ],
      selectListTwo: [
        {key: '5', value: 'Option 5'},
        {key: '6', value: 'Option 6'},
        {key: '7', value: 'Option 7'},
        {key: '8', value: 'Option 8'}
      ],
      selectListThree: [
        {key: '9', value: 'Option 9'},
        {key: '10', value: 'Option 10'},
        {key: '11', value: 'Option 11'},
        {key: '12', value: 'Option 12'}
      ]
    };

    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
  }

}
