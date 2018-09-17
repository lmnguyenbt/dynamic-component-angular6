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
        const pathCSS = './assets/_themes/theme_1/assets/scss/page-not-found.scss';

        Promise.all([this.templLoaderService.getHTML(pathHTML), this.templLoaderService.getCSS(pathCSS)] ).then((res) => {
            this.loadDynamicContent(res[0], res[1]);
        });
    }

    ngOnDestroy() {
        if(this.componentRef) {
            this.componentRef.destroy();
        }
    }

    private loadDynamicContent(tmpl: any, css: any, bindings?: any): void {
        const dynamicComponent = this.createNewComponent(tmpl, css, bindings);
        const dynamicModule = this.createNewComponentModule(dynamicComponent);

        this._compiler.compileModuleAndAllComponentsAsync( dynamicModule ).then( ( factories ) => {
            const factory = factories.componentFactories.find((comp) => {
                return comp.componentType === dynamicComponent
            });

            this.componentRef = factory.create( this._injector, [], null, this._m );
            (this.componentRef.instance).users = bindings;
            this.pageNotFoundContainer.insert( this.componentRef.hostView );
        } );
    }

    private createNewComponent(tmpl: any, css: any, bindings: any) {
        @Component({
            template: tmpl,
            styles: [css]
        })
        class PageNotFoundComponent implements OnInit {
            public bindings: any;

            ngOnInit() {
                this.bindings = bindings
            }
        }

        return PageNotFoundComponent;
    }

    private createNewComponentModule(componentType: any) {
        @NgModule({
            imports: [
                RouterModule,
                CommonModule
            ],
            declarations: [
                componentType
            ]
        })
        class runtimeComponentModule { }

        return runtimeComponentModule;
    }
}
