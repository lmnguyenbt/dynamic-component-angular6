import { Injectable } from "@angular/core";
import { ApiService } from 'src/app/_services/api.service';

@Injectable( { providedIn: 'root' } )
export class TmplLoaderService {

    constructor( private ApiService: ApiService ) {
    };

    /**
     * @param path
     * @param params
     * @returns {Promise<any>}
     */
    getHTML(path, params?) {
        return new Promise( ( resolve ) => {
            this.ApiService.getTempl( path, params ).subscribe( ( res ) => {
                resolve( res );
            } );
        } );
    }

    /**
     * @param path
     * @param params
     * @returns {Promise<any>}
     */
    getCSS(path, params?) {
        return new Promise( ( resolve ) => {
            this.ApiService.getTempl( path, params ).subscribe( ( res ) => {
                resolve( res );
            } );
        } );
    }

    /**
     * @param {String} template
     * @param style
     */
    createDynamicComponent(template: String, style: any) {

    }
}
