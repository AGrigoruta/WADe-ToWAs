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
    // this.getValues();
    this.itinerary = this.getItinerary().data;
  }

  searchCity(event) {
    if (event.keyCode !== 13) {
      return;
    } else {
      this.citySearch = this.citySearch.charAt(0).toUpperCase() + this.citySearch.slice(1);
      this.api.sendCityName(this.citySearch).subscribe();
      this.citySearch = '';
    } 
  }

  getValues() {
    this.api.getValues().subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  getItinerary() {
    const dummyItinerary = {
      data: [
        {
          latitude: 47.1556845,
          longitude: 27.5780501,
          name: 'Palace of Culture',
          address: 'Bulevardul Stefan cel Mare si Sfant 1, Iasi 700028',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Palace_of_Culture_%28Ia%C5%9Fi%29_0107.jpg/250px-Palace_of_Culture_%28Ia%C5%9Fi%29_0107.jpg'
        },
        {
          latitude: 47.1591123,
          longitude: 27.5859489,
          name: 'Romanian National Opera Iasi',
          address: 'Strada Agatha Barsescu nr. 18, Iasi 700074',
          picture: 'https://media-cdn.tripadvisor.com/media/photo-s/01/6f/c4/6a/teatrul-national-vasile.jpg'
        },
        {
          latitude: 47.1704288,
          longitude: 27.577329,
          name: 'Alexandru Ioan Cuza University',
          address: 'Bulevardul Carol I nr. 11, Iasi 700506',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Ia%C5%9Fi_%2C_%22Alexandru_Ioan_Cuza%22_University_of_Ia%C5%9Fi.JPG'
        },
        {
          latitude: 47.1852771,
          longitude: 27.5605993,
          name: 'Botanical Garden',
          address: 'Strada Dumbrava Rosie nr. 7-9, Iasi',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/The_small_pond_in_the_Ia%C5%9Fi_Botanical_Garden_%28autumn_2015%29.JPG/250px-The_small_pond_in_the_Ia%C5%9Fi_Botanical_Garden_%28autumn_2015%29.JPG'
        }
      ]
    }

    return dummyItinerary;
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
