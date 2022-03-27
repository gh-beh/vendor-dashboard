import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
// import AuthenticationService from './services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        // private authenticationService: AuthenticationService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // let currentUser = this.authenticationService.currentUserValue;
        // if (currentUser && currentUser.token) {
        const currentUser = {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJndWlkIjoiYjlmMTVhMGQtMzAzOS00YzY0LWI2ZDAtNDQzNzcyZjlkNWRiIn0.gAnx9j16JCvtS0ieIONtAenIQONTR77nN60Xz_6CL8g',
        };
        request = request.clone({
                setHeaders: {
                    'user-token': currentUser.token,
                }
            });
        // }

        return next.handle(request);
    }
}
