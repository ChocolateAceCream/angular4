import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
//import { Response } from '@angular/http';
//import { HttpEvent, HttpEventType } from '@angular/common/http';
//import { AuthService } from '../../auth/auth.service'
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(
        private dataStorageService: DataStorageService,
        //private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.authState = this.store.select('auth');
        //store here is fromApp store, type of AppState, then select the auth,
        //which is:
        //auth: fromAuth.State
        //that's why the authState was set to Observable and type of
        //fromAuth.State
    }

    onSaveData() {
        //one way is to subscribe the observable returned from http.put in that
        //service component, the other way is to subscribe in the actual
        //component which use that service. we choosed the second way because we
        //now are able to customise error message for different component.

        this.dataStorageService.storeRecipes()
            .subscribe(

                // (response: HttpEvent<Object>) => {
                    // console.log(response.type === HttpEventType.Sent);
                (response) => {
                    console.log(response);
                }
            );
    }

    onFetchData() {
        //since we already subscribe in our data-storage, we dont need to do
        //here
       this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.LogOut());
    }

    /*
    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
    */
}
