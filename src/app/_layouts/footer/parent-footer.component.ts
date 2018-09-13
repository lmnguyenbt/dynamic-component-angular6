import {
    Compiler, Component, Injector, NgModule, NgModuleRef,
    ViewContainerRef, OnInit, ViewChild, OnDestroy, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BaseFooterComponent } from 'src/app/_layouts/footer/base-footer.component';
import { FooterModel } from 'src/app/_layouts/footer/footer.model';
import { TmplLoaderService } from 'src/app/_services/tmpl-loader.service';

@Component({
    selector: 'app-footer',
    template: '<ng-template #footerContainer></ng-template>',
    providers: [TmplLoaderService]
})
export class ParentFooterComponent implements OnInit, OnDestroy {
    @ViewChild( 'footerContainer', { read: ViewContainerRef } ) footerContainer: ViewContainerRef;

    public componentRef: any;

    constructor(private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>,
                private templLoaderService: TmplLoaderService) {
    }

    ngOnInit() {
        const pathHTML = './assets/_themes/theme_1/pages/footer.html';
        const pathCSS = './assets/_themes/theme_1/scss/footer.scss';

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
        class FooterComponent extends BaseFooterComponent implements OnInit {
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
                FooterComponent
            ]
        })
        class tmpModule { }

        this._compiler.compileModuleAndAllComponentsAsync( tmpModule ).then( ( factories ) => {
            const factory = factories.componentFactories.find((comp) => {
                return comp.componentType === FooterComponent
            });

            this.componentRef = factory.create( this._injector, [], null, this._m );
            (<FooterModel>this.componentRef.instance).users = data;
            this.footerContainer.insert( this.componentRef.hostView );
        } );
    }
}
