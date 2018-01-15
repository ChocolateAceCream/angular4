//provide in core module
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from'../auth/store/auth.reducers';
import 'rxjs/add/operator/switchMap';

//this class implelemt a special interface HttpInterceptor from Http
//this interface implement a method called intercept()
//this method take two arguments, a request of type HttpRequest and next:
//HttpHandler, a object with special method, enable to customize the request,
//without calling HttpHandler, ur request will not able to leave the app
//
//intercept method return a observable since angular use observable to warp http
//request
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log('Intercepted',req);

        //by cloning a copy of incoming request, we can now safely edit it.
        //since request is immutable, we can only work on the copy and return
        //the copy.
        /*
        const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});
        */
        //the clone method will allow us to update request params, e.g. append a
        //header or set a heaer:
        //const copiedReq = req.clone({headers: req.headers.append('','')});
        //const copiedReq = req.clone({headers: req.headers.set('','')});

        //this will let ur req continue its jurney
        //return next.handle(copiedReq);
        //
        //using store: since intercept will return an observable,
        return this.store.select('auth')
            .take(1)
        //only take this value once. otherwise, whenever our state get
        //changed, this return next.handle method will be trigeered and then
        //send out new request.
            .switchMap((authState: fromAuth.State) => {
                //since we already in a obervable and access to authState, now
                //the token is sync and we can use it directly.
                const copiedReq = req.clone({params: req.params.set('auth',authState.token)});
                return next.handle(copiedReq);
            })
        //the reason why we use switchMap instead of map is that map will warp
        //the returned observable into a new observable, but switchMap will only
        //return the obervable itself, but use the return value directly, in
        //this case, the returned value is observalbe.
    }
    //observable is a generic type, will eventually give back a httpEvent, which
    //also will be a generic type of any (events, such as uploading progress
    //event, send event ect...),
}
