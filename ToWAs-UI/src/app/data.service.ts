import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  private apiUrl:string = 'http://localhost:58844/api';
  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    let url = `${this.apiUrl}/values`;
    return this.http.get(url);
  }

  sendCityName(data: any): Observable<any> {
    let url = `${this.apiUrl}/itinerary/location`;
    return this.http.post(url, data);
  }
}
