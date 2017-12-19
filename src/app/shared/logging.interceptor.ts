//for editing the response
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';//unlock do operator

export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        //do operator allows us to execute some code on any data which goes from
        //that obervable without consuming it. in contrust, subscribe will
        //consume the observable.
        return next.handle(req).do(
            event => {
                console.log('Logging interceptor', event);
            }
        );
    }
}
