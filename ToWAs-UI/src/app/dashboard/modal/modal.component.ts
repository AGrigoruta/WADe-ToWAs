import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  selectList: any;
  selectListTwo: any;
  selectListThree: any;
  selectedOptionOne: string;
  selectedOptionTwo: string;
  selectedOptionThree: string;
  dismissed: boolean;

  constructor(public bsModalRef: BsModalRef, private user: UserService) { }

  ngOnInit() {
    this.selectedOptionOne = this.selectList[0].key;
    this.selectedOptionTwo = this.selectListTwo[0].key;
    this.selectedOptionThree = this.selectListThree[0].key;
  }

  submit() {
    console.log(this.selectedOptionOne, this.selectedOptionTwo, this.selectedOptionThree);
    this.user.setTest(this.selectedOptionOne);
    this.dismissed = false;
    this.bsModalRef.hide();
  }

}
