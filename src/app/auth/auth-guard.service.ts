import { Store } from "@ngrx/store";
import { CanActivate, CanLoad, ActivatedRouteSnapshot,Route, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromApp from "../store/app.reducers";
import * as fromAuth from'./store/auth.reducers';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private store: Store<fromApp.AppState>) {}

    //canActivate take a route, a state and return a promise/observable/boolean
    //canActivate method is necessary to properly implement the CanActivate
    //interface
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //canActivate allowed to return an Observable, and our observable will
        //resolve to a boolean,so we  use 'map' operator to map the resolve
        //result to a boolean
        return this.store.select('auth')
            .take(1)
            .map((authState: fromAuth.State) => {
            return authState.authenticated;
        });
        //return this.authService.isAuthenticated();//return a boolean

    }

    //protect the lazy loaded routers with canLoad
    canLoad(route: Route) {
        //return this.authService.isAuthenticated();//return a boolean
        return this.store.select('auth')
            .take(1)
            .map((authState: fromAuth.State) => {
            return authState.authenticated;
        });

    }

}
