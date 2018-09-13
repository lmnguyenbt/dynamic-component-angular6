import {
    Compiler, Component, Injector, NgModule, NgModuleRef,
    ViewContainerRef, OnInit, ViewChild, OnDestroy, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BaseHeaderComponent } from 'src/app/_layouts/header/base-header.component';
import { HeaderModel } from 'src/app/_layouts/header/header.model';
import { TmplLoaderService } from 'src/app/_services/tmpl-loader.service';

@Component({
    selector: 'app-header',
    template: '<ng-template #headerContainer></ng-template>',
    providers: [TmplLoaderService]
})
export class ParentHeaderComponent implements OnInit, OnDestroy {
    @ViewChild( 'headerContainer', { read: ViewContainerRef } ) headerContainer: ViewContainerRef;

    public componentRef: any;

    constructor(private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>,
                private templLoaderService: TmplLoaderService) {
    }

    ngOnInit() {
        const pathHTML = './assets/_themes/theme_1/pages/header.html';
        const pathCSS = './assets/_themes/theme_1/scss/header.scss';

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
        class Headeromponent extends BaseHeaderComponent implements OnInit {
            @Input() data: any;

            ngOnInit() {

            }
        }

        @NgModule({
            imports: [
                RouterModule,
                CommonModule
            ],
            declarations: [
                Headeromponent
            ]
        })
        class tmpModule { }

        this._compiler.compileModuleAndAllComponentsAsync( tmpModule ).then( ( factories ) => {
            const factory = factories.componentFactories.find((comp) => {
                return comp.componentType === Headeromponent
            });

            this.componentRef = factory.create( this._injector, [], null, this._m );
            (<HeaderModel>this.componentRef.instance).users = data;
            this.headerContainer.insert( this.componentRef.hostView );
        } );
    }
}
