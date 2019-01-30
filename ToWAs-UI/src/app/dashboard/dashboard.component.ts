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
  bsModalRef: BsModalRef;
  itinerary: any = [];
  citySearch: string;

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
    console.log(this.user);
    if (!this.user.getAge()) {
      this.openForm();
    }
  }

  searchCity(event) {
    if (event.keyCode !== 13) {
      return;
    } else {
      this.citySearch = this.citySearch.charAt(0).toUpperCase() + this.citySearch.slice(1);
      const payload = {
        cityName: this.citySearch,
        age: this.user.getAge(),
        trip: this.user.getTrip(),
        stay: this.user.getStay(),
        cultural: this.user.getCultural(),
        sport: this.user.getSport(),
        religious: this.user.getReligious()
      }
      this.api.sendCityName(payload).subscribe((res) => {
        this.itinerary = res;
      });
      this.citySearch = '';
    } 
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
      const userData = {
        age: this.user.getAge(),
        trip: this.user.getTrip(),
        stay: this.user.getStay(),
        cultural: this.user.getCultural(),
        sport: this.user.getSport(),
        religious: this.user.getReligious()
      }
      console.log(userData);
    }
  }

  openForm() {
    const initialState = {
      dismissed: true,
      ageList: [
        {key: 'age1', value: '18-24'},
        {key: 'age2', value: '25-35'},
        {key: 'age3', value: '36-50'},
        {key: 'age4', value: '50+'}
      ],
      tripList: [
        {key: 'trip1', value: 'Business Trip'},
        {key: 'trip2', value: 'Solo trip'},
        {key: 'trip3', value: 'Family trip'},
        {key: 'trip4', value: 'Travel with group of friends'}
      ],
      stayList: [
        {key: 'stay_yes', value: 'Yes'},
        {key: 'stay_no', value: 'No'}
      ],
      culturalList: [
        {key: 'cultural_yes', value: 'Yes'},
        {key: 'cultural_no', value: 'No'}
      ],
      sportList: [
        {key: 'sport_yes', value: 'Yes'},
        {key: 'sport_no', value: 'No'}
      ],
      religiousList: [
        {key: 'religious_yes', value: 'Yes'},
        {key: 'religious_no', value: 'No'}
      ],
    };

    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
  }

}
