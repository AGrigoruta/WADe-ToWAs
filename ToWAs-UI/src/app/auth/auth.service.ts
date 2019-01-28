import { Injectable } from '@angular/core';
import { FB } from '../FB.interface';

@Injectable()
export class AuthService {

  hasAuthenticatedOnce = false;
  constructor() { }

  public async isAuthenticated(): Promise<any> {
    // Check for user authentication status
    let authenticatedObject:any = {};
    let _FB: FB = await new Promise(
      (res, rej) => {
        //@ts-ignore
        setTimeout(() => res(window.FB), 250)
      });

    const getLoginStatus = () => {
        return new Promise(async (resolve) => {

        _FB.getLoginStatus((response) => {
          resolve(response);
        });
      });
    };

    let authResponse: any = await getLoginStatus();
    if (!this.hasAuthenticatedOnce) {
      this.hasAuthenticatedOnce = true;
    }
    authenticatedObject.redirect = !this.hasAuthenticatedOnce;
    if (authResponse && authResponse.status === 'connected') {
      authenticatedObject.authenticated = true;
    } else {
      authenticatedObject.authenticated = false;
    }

    return authenticatedObject;
  }

}
