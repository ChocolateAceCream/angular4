import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthEffects {
    @Effect() //import from ngrx/effects

    //@Effect({dispatch: false})
        //usually by the end of effect, dispatch a new efffect(emmit actions), if you dont want to,
        //set dispatch to false at @Effect

    //unlike reducers, we dont change any state of application in this process.

    //now we can watch for certain actions occuring by assign that action to
    //authSignp, by using ofType to select that action(then the process will
    //continue).
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        //use map operator to return the action payload as an observable.
        //we can then chain more operators after map
        .map((action: AuthActions.TrySignup) => {
            return action.payload;
        })
        //{username: string, password: string} is the input type defination of
        //switchMap
        .switchMap((authData: {username: string, password: string}) => {
            //fromPromise convert a promise to obervable
            //reach to firebase to create a user
              return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            //fetch the token after signup
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        //since we need an obervable, we use map to convert the token string to obervable
        //since we want to dispatch multiple action, we use merge map to convert
        //multiple obervable into one
        .mergeMap((token: string) => {
            //return an array of two obervables, and that array will be convert to obervable by
            //mergerMap, then this obervable will be taken by effect and
            //dispatch new action
            //use map if only one action dispatched.
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
            ;
        });

    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignin) => {
            return action.payload;
        })
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: AuthActions.SIGNIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        });

    @Effect({dispatch: false})  //set to false if no action dispatched at the end
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        //here we dont use subscribe because we dont want to finish the chain
        //here. as you know, RxJs will let this observable going thorugh reducers as
        //well
        //  do operator allows us do something without changing the value of
        //  subscriber received
        .do(() => {
            this.router.navigate(['/']);
        });

    //NgRx Effect can automatically retrive the actions from store,
    //$ sign here means actions will be an observable
    //those actions from store then can be watched for occuring.
    constructor(private actions$: Actions, private router: Router ) {
    }
}
