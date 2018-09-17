import {
    Compiler, Component, Injector, NgModule, NgModuleRef,
    ViewContainerRef, OnInit, ViewChild, OnDestroy, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BaseHeaderComponent } from 'src/app/_layouts/header/base-header.component';
import { HeaderModel } from 'src/app/_layouts/header/header.model';
import { TmplLoaderService } from 'src/app/_services/tmpl-loader.service';
import { NgModuleFactory } from '@angular/core';

@Component({
    selector: 'app-header',
    template: '<ng-template #headerContainer></ng-template>',
    providers: [TmplLoaderService]
})
export class ParentHeaderComponent implements OnInit, OnDestroy {
    @ViewChild( 'headerContainer', { read: ViewContainerRef } ) headerContainer: ViewContainerRef;

    public componentRef: any;

    @Input() public bindings: any = {};

    constructor(private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>,
                private templLoaderService: TmplLoaderService) {
    }

    ngOnInit() {
        const pathHTML = './assets/_themes/theme_1/pages/header.html';
        const pathCSS = './assets/_themes/theme_1/assets/scss/header.scss';

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
            (<HeaderModel>this.componentRef.instance).users = bindings;
            this.headerContainer.insert( this.componentRef.hostView );
        } );
    }

    private createNewComponent(tmpl: any, css: any, bindings: any) {
        @Component({
            template: tmpl,
            styles: [css]
        })
        class Headeromponent extends BaseHeaderComponent implements OnInit {
            public bindings: any;

            ngOnInit() {
                this.bindings = bindings
            }
        }

        return Headeromponent;
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
