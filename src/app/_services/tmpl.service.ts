import { Injectable } from '@angular/core';
import {
    Compiler, Component, Injector, NgModule, NgModuleRef,
    ViewContainerRef, OnInit, ViewChild, OnDestroy, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ApiService } from 'src/app/_services/api.service';

@Injectable( { providedIn: 'root' } )
export class TmplService {

    constructor( private _compiler: Compiler,
                 private _injector: Injector,
                 private _m: NgModuleRef<any>,
                 private ApiService: ApiService ) {
    };

    /**
     * @param path
     * @param params
     * @returns {Promise<any>}
     */
    getHTML( path, params? ) {
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
    getCSS( path, params? ) {
        return new Promise( ( resolve ) => {
            this.ApiService.getTempl( path, params ).subscribe( ( res ) => {
                resolve( res );
            } );
        } );
    }

    loadDynamicComponent( componentRef: any, el_container: any, tmpl: any, style: any, base_component?: any, imports = [], bindings?: any ) {
        const dynamicComponent = this.createNewDynamicComponent( tmpl, style, bindings, base_component );
        const dynamicComponentModule = this.createNewDynamicComponentModule( dynamicComponent, imports );

        this._compiler.compileModuleAndAllComponentsAsync( dynamicComponentModule ).then( ( factories ) => {
            const factory = factories.componentFactories.find( ( comp ) => {
                return comp.componentType === dynamicComponent;
            } );

            componentRef = factory.create( this._injector, [], null, this._m );
            //(<model_component>componentRef.instance).users = bindings;
            el_container.insert( componentRef.hostView );
        } );
    }

    /**
     * @param tmp
     * @param style
     * @param bindings
     * @param base_component
     */
    createNewDynamicComponent( tmpl: any, style: any, bindings: any, base_component?: any ) {
        @Component( {
            template: tmpl,
            styles: [ style ]
        } )
        class DynamicComponent extends base_component implements OnInit {
            public bindings: any;

            ngOnInit() {
                this.bindings = bindings;
            }
        }

        return DynamicComponent;
    }

    /**
     * @param {Array} imports
     * @param componentType
     * @returns {runtimeComponentModule}
     */
    createNewDynamicComponentModule( componentType: any, imports = [] ) {
        const importDefault = [
            RouterModule,
            CommonModule
        ];

        @NgModule( {
            imports: [ ...importDefault, ...imports ],
            declarations: [
                componentType
            ]
        } )
        class runtimeComponentModule {
        }

        return runtimeComponentModule;
    }
}
