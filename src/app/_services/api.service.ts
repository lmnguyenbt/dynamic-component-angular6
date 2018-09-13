import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, Observer } from 'rxjs/index';
import { catchError, map, tap } from 'rxjs/internal/operators';

import { JwtService } from './jwt.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
    public token: string;

    constructor( public httpClient: HttpClient, private jwtService: JwtService ) {
    }

    private headerOptionDefault( params? ) {
        const httpOptions = {
            headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.jwtService.getToken() } ),
        };

        if ( params ) {
            httpOptions[ 'params' ] = params;
        }
        return httpOptions;
    }

    private headerOptionFormData() {
        const httpOptions = {
            headers: new HttpHeaders( {
                'Authorization': 'Bearer ' + this.jwtService.getToken()
            } )
        };
        return httpOptions;
    }

    get( path, params? ): Observable<any> {
        return this.httpClient.get( `${environment.api_url}${path}`, this.headerOptionDefault( params ) )
        .pipe(
            catchError( this.handleError( 'message', [] ) )
        );
    }

    post( path, params = {} ): Observable<any> {
        return this.httpClient.post( `${environment.api_url}${path}`, JSON.stringify( params ), this.headerOptionDefault() )
        .pipe(
            catchError( this.handleError( 'message', [] ) )
        );
    }

    put( path, params = {} ): Observable<any> {
        return this.httpClient.put( `${environment.api_url}${path}`, JSON.stringify( params ), this.headerOptionDefault() )
        .pipe(
            catchError( this.handleError( 'message', [] ) )
        );

    }

    delete( path ): Observable<any> {
        return this.httpClient.delete( `${environment.api_url}${path}`, this.headerOptionDefault() )
        .pipe(
            catchError( this.handleError( 'message', [] ) )
        );
    }

    deleteWithParam( path: string, body = {} ): Observable<any> {
        return this.httpClient.delete( `${environment.api_url}${path}`, this.headerOptionDefault( body ) )
        .pipe(
            catchError( this.handleError( 'message', [] ) )
        );
    }

    postForm( path, formData ) {
        return this.httpClient.post( `${environment.api_url}${path}`, this.madeFormData( formData ), this.headerOptionFormData() )
        .pipe(
            catchError( this.handleError( 'message', [] ) )
        );
    }

    putForm( path, formData ) {
        return this.httpClient.put( `${environment.api_url}${path}`, this.madeFormData( formData ), this.headerOptionFormData() )
        .pipe(
            catchError( this.handleError( 'message', [] ) )
        );
    }

    madeFormData( data ) {
        const formData: FormData = new FormData();
        // tslint:disable-next-line:forin
        for ( const i in data ) {
            if ( data[ i ] instanceof Array ) {
                data[ i ].forEach( ( item, index ) => {
                    if ( item instanceof Object && !(item instanceof File) ) {
                        // tslint:disable-next-line:forin
                        for ( const j in item ) {
                            formData.append( i + '[' + index + '][' + j + ']', item[ j ] );
                        }
                    } else {
                        formData.append( i + '[]', item );
                    }
                } );
            } else {
                formData.append( i, data[ i ] );
            }
        }
        return formData;
    }

    private headerOptionDefaultTempl( params? ) {
        const httpOptions = {
            headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.jwtService.getToken() } )
        };

        httpOptions[ 'responseType' ] = 'text';

        if ( params ) {
            httpOptions[ 'params' ] = params;
        }
        return httpOptions;
    }

    getTempl( path, params? ): Observable<any> {
        return this.httpClient.get( `${environment.api_url}${path}`, this.headerOptionDefaultTempl( params ) )
        .pipe(
            catchError( this.handleError( 'message', [] ) )
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>( operation = 'operation', result?: T ) {
        return ( error: any ): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error( error ); // log to console instead

            // Let the app keep running by returning an empty result.
            return of( result as T );
        };
    }
}
