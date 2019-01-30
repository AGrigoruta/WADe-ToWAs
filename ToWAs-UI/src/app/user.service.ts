import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  position: any;
  test: any;
  age: string;
  trip: string;
  stay: string;
  cultural: string;
  sport: string;
  religious: string;
  constructor() { }

  getPosition() {
    return this.position;
  }

  setPosition(position: any) {
    this.position = position;
  }

  getAge() {
    return this.age;
  }

  setAge(age: any) {
    this.age = age;
  }

  getTrip() {
    return this.trip;
  }

  setTrip(trip: any) {
    this.trip = trip;
  }

  getStay() {
    return this.stay;
  }

  setStay(stay: any) {
    this.stay = stay;
  }

  getCultural() {
    return this.cultural;
  }

  setCultural(cultural: any) {
    this.cultural = cultural;
  }

  getSport() {
    return this.sport;
  }

  setSport(sport: any) {
    this.sport = sport;
  }

  getReligious() {
    return this.religious;
  }

  setReligious(religious: any) {
    this.religious = religious;
  }
}
