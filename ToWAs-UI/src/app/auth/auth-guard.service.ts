import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()

export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(): Promise<boolean> {
        return this.auth.isAuthenticated().then((res) => {
            if (res.authenticated) {
                if (res.redirect) {
                    this.router.navigate(['dashboard']);
                }
                return true;
            } else {
                if (res.redirect) {
                    this.router.navigate(['login']);
                }
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}