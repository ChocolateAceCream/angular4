import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

//import {AuthService } from '../auth.service';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
    }

    onSignin(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));
        //this.authService.signinUser(email, password);
    }
        /*
    getToken() {
        //JWT was stored in local storage, under user object, which can be
        //retrived here
        //getToekn method will first inspect the token from local storage, if
        //token expired, it will retrieve a new one from server.therefore, it's
        //a asychromized process,and actually return a promise.
        return firebase.auth().currentUser.getToken()
    }
         */

}
