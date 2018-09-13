import {
    Compiler, Component, Injector, NgModule, NgModuleRef,
    ViewContainerRef, OnInit, ViewChild, OnDestroy, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BaseHomeComponent } from 'src/app/modules/home/base-home.component';
import { HomeModel } from 'src/app/modules/home/home.model';
import { TmplLoaderService } from 'src/app/_services/tmpl-loader.service';

@Component({
    selector: 'app-home',
    template: '<ng-template #homeContainer></ng-template>',
    providers: [TmplLoaderService]
})
export class ParentHomeComponent implements OnInit, OnDestroy {
    @ViewChild( 'homeContainer', { read: ViewContainerRef } ) homeContainer: ViewContainerRef;

    public componentRef: any;

    constructor( private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>,
                private templLoaderService: TmplLoaderService) {
    }

    ngOnInit() {
        const pathHTML = './assets/_themes/theme_1/pages/home.html';
        const pathCSS = './assets/_themes/theme_1/scss/home.scss';

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
        class HomeComponent extends BaseHomeComponent implements OnInit {
            @Input() data: any;

            constructor(private router: Router) {
                super();
            }

            ngOnInit() {

            }

            changePage() {
                this.router.navigate(['/page-not-found']);
                console.log('clicked!');
            }
        }

        @NgModule({
            imports: [
                RouterModule,
                CommonModule
            ],
            declarations: [
                HomeComponent
            ]
        })
        class tmpModule { }

        this._compiler.compileModuleAndAllComponentsAsync( tmpModule ).then( ( factories ) => {
            const factory = factories.componentFactories.find((comp) => {
                return comp.componentType === HomeComponent
            });

            this.componentRef = factory.create( this._injector, [], null, this._m );
            (<HomeModel>this.componentRef.instance).users = data;
            this.homeContainer.insert( this.componentRef.hostView );
        } );
    }
}
