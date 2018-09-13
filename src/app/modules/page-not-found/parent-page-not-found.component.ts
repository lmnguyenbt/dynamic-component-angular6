import {
    Compiler, Component, Injector, NgModule, NgModuleRef,
    ViewContainerRef, OnInit, ViewChild, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule } from '@angular/router';

import { TmplLoaderService } from 'src/app/_services/tmpl-loader.service';

@Component({
    selector: 'app-page-not-found',
    template: '<ng-template #pageNotFoundContainer></ng-template>',
    providers: [TmplLoaderService]
})
export class ParentPageNotFoundComponent implements OnInit, OnDestroy {
    @ViewChild( 'pageNotFoundContainer', { read: ViewContainerRef } ) pageNotFoundContainer: ViewContainerRef;

    public componentRef: any;

    constructor(private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>,
                private templLoaderService: TmplLoaderService) {
    }

    ngOnInit() {
        const pathHTML = './assets/_themes/theme_1/pages/page-not-found.html';
        const pathCSS = './assets/_themes/theme_1/scss/page-not-found.scss';

        Promise.all([this.templLoaderService.getHTML(pathHTML), this.templLoaderService.getCSS(pathCSS)] ).then((res) => {
            this.createComponent( res[0], res[1] );
        });
    }

    ngOnDestroy() {
        if(this.componentRef) {
            this.componentRef.destroy();
        }
    }

    createComponent(html, css, data?) {
        @Component({
            template: html,
            styles: css
        })
        class PageNotFoundComponent implements OnInit {

            ngOnInit() {

            }
        }

        @NgModule({
            imports: [
                RouterModule,
                CommonModule
            ],
            declarations: [
                PageNotFoundComponent
            ]
        })
        class tmpModule { }

        this._compiler.compileModuleAndAllComponentsAsync( tmpModule ).then( ( factories ) => {
            const factory = factories.componentFactories.find((comp) => {
                return comp.componentType === PageNotFoundComponent
            });

            this.componentRef = factory.create( this._injector, [], null, this._m );
            (this.componentRef.instance).users = data;
            this.pageNotFoundContainer.insert( this.componentRef.hostView );
        } );
    }
}
