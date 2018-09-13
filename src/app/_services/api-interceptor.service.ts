import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from "rxjs/index";
import { catchError } from "rxjs/internal/operators";

@Injectable( { providedIn: 'root' } )
export class ErrorInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return next.handle( request ).pipe(
            catchError( ( err ) => {
                if ( err.status == 401 ) {
                    // auto logout if 401 response returned from api

                    // redirect to login page
                }

                const error = err.error.message || err.statusText;
                return throwError( error );
            } )
        )
    }
}
