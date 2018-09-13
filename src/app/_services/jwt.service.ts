import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

    jwtTokenKey = 'token';

    getToken() {
        return window.localStorage[ this.jwtTokenKey ];
    }

    saveToken( token ) {
        window.localStorage[ this.jwtTokenKey ] = token;
    }

    saveUser( user: string ) {
        window.localStorage[ 'currUser' ] = user;
    }

    getUser() {
        if ( window.localStorage[ 'currUser' ] ) {
            return window.localStorage[ 'currUser' ];
        }
        return;
    }

    destroyToken() {
        window.localStorage.removeItem( this.jwtTokenKey );
    }

    destroyAll() {
        window.localStorage.removeItem( this.jwtTokenKey );
        window.localStorage.removeItem( 'currUser' );
    }

    destroyUser() {
        window.localStorage.removeItem( 'currUser' );
        window.localStorage.removeItem( 'group_permissions' );
        window.localStorage.removeItem( 'enable_permissions' );
    }

    cleanLocalStorage() {
        window.localStorage.clear();
    }

}
