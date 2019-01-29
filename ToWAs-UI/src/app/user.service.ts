import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  position: any;
  test: any;
  constructor() { }

  getPosition() {
    return this.position;
  }

  setPosition(position: any) {
    this.position = position;
  }

  getTest() {
    return this.test;
  }

  setTest(test: any) {
    this.test = test;
  }
}
