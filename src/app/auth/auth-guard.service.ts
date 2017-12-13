import { CanActivate, CanLoad, ActivatedRouteSnapshot,Route, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private authService: AuthService) {}

    //canActivate take a route, a state and return a promise/observable/boolean
    //canActivate method is necessary to properly implement the CanActivate
    //interface
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated();//return a boolean

    }

    //protect the lazy loaded routers with canLoad
    canLoad(route: Route) {
        return this.authService.isAuthenticated();//return a boolean

    }

}
