import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  ageList: any;
  tripList: any;
  stayList: any;
  culturalList: any;
  sportList: any;
  religiousList: any;
  selectedAge: string;
  selectedTrip: string;
  selectedStay: string;
  selectedCultural: string;
  selectedSport: string;
  selectedReligious: string;
  dismissed: boolean;

  constructor(public bsModalRef: BsModalRef, private user: UserService) { }

  ngOnInit() {
    this.selectedAge = this.ageList[0].key;
    this.selectedTrip = this.tripList[0].key;
    this.selectedStay = this.stayList[0].key;
    this.selectedCultural = this.culturalList[0].key;
    this.selectedSport = this.sportList[0].key;
    this.selectedReligious = this.religiousList[0].key;
  }

  submit() {
    this.user.setAge(this.selectedAge);
    this.user.setTrip(this.selectedTrip);
    this.user.setStay(this.selectedStay);
    this.user.setCultural(this.selectedCultural);
    this.user.setSport(this.selectedSport);
    this.user.setReligious(this.selectedReligious);
    this.dismissed = false;
    this.bsModalRef.hide();
  }

}
