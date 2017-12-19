//provide in core module
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';

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
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log('Intercepted',req);

        //by cloning a copy of incoming request, we can now safely edit it.
        //since request is immutable, we can only work on the copy and return
        //the copy.
        const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});
        //the clone method will allow us to update request params, e.g. append a
        //header or set a heaer:
        //const copiedReq = req.clone({headers: req.headers.append('','')});
        //const copiedReq = req.clone({headers: req.headers.set('','')});

        //this will let ur req continue its jurney
        return next.handle(copiedReq);
    }
    //observable is a generic type, will eventually give back a httpEvent, which
    //also will be a generic type of any (events, such as uploading progress
    //event, send event ect...),
}
