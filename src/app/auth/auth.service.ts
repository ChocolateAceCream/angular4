//service for authentication
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
//Injectable allow a service inject other service into it
export class AuthService {
    token: string;

    constructor(private router: Router) {}
    signupUser(email: string, password: string) {
        //method used to sign user up
        //auth method listen to the resovle of method call
        //createUserWithEmailAndPassword, then auth method will return a promise
        //since auth will return a promise, we can use then method to subscribe
        //to it, but here we only want to catch errors:
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )

    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    //redirect to root page after successful signin
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        )
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;//might return the expired token, add error handling later
    }

    isAuthenticated() {
        return this.token != null;
    }

        //firebase will clean the local storage itself, but we need to reset the
        //token
        firebase.auth().signOut();
        this.router.navigate(['/']);
        this.token = null;
    logout() {
    }

}
