import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const TRY_SIGNIN = 'TRY_SIGNIN';

export class TrySignin implements Action {
    readonly type = TRY_SIGNIN;
    //we need a payload for username and email
    constructor(public payload: {username: string, password: string}) {}
}
export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    //we need a payload for username and email
    constructor(public payload: {username: string, password: string}) {}
}

export class Signup implements Action {
    readonly type = SIGNUP;
}

export class Signin implements Action {
    readonly type = SIGNIN;
}

export class LogOut implements Action {
    readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}

export type AuthActions = Signin | Signup | LogOut | SetToken | TrySignup | TrySignin;
