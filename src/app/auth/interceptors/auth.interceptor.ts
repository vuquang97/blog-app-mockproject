import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userToken = localStorage.getItem('jwtToken');

        req = req.clone({ setHeaders: { 'Content-Type': 'application/json; charset=utf-8' } });

        if(userToken) {
            req = req.clone({ setHeaders: { 'Authorization': 'Token ' + userToken } })
        }

        return next.handle(req).pipe(
            tap(
                event => {},
                error => {
                   if (error.status === 401) {
                       this.router.navigate(['/login']);
                   }
                   console.log(error)
                }
            )
        );
    }
}