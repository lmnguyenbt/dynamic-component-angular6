import {
    Compiler, Component, Injector, NgModule, NgModuleRef,
    ViewContainerRef, OnInit, ViewChild, OnDestroy, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BaseFooterComponent } from 'src/app/_layouts/footer/base-footer.component';
import { FooterModel } from 'src/app/_layouts/footer/footer.model';

import { TmplService } from 'src/app/_services/tmpl.service';

@Component({
    selector: 'app-footer',
    template: '<ng-template #footerContainer></ng-template>',
    providers: [TmplService]
})
export class ParentFooterComponent implements OnInit, OnDestroy {
    @ViewChild( 'footerContainer', { read: ViewContainerRef } ) footerContainer: ViewContainerRef;

    public componentRef: any;

    @Input() public bindings: any = {};

    constructor(private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>,
                private tmplService: TmplService) {
    }

    ngOnInit() {
        const pathHTML = './assets/_themes/theme_1/pages/footer.html';
        const pathCSS = './assets/_themes/theme_1/assets/scss/footer.scss';

        Promise.all([this.tmplService.getHTML(pathHTML), this.tmplService.getCSS(pathCSS)] ).then((res) => {
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
            (<FooterModel>this.componentRef.instance).users = bindings;
            this.footerContainer.insert( this.componentRef.hostView );
        } );
    }

    private createNewComponent(tmpl: any, css: any, bindings: any) {
        @Component({
            template: tmpl,
            styles: [css]
        })
        class FooterComponent extends BaseFooterComponent implements OnInit {
            public bindings: any;

            ngOnInit() {
                this.bindings = bindings
            }
        }

        return FooterComponent;
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
