import {
    Compiler, Component, Injector, NgModule, NgModuleRef,
    ViewContainerRef, OnInit, ViewChild, OnDestroy, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BaseHomeComponent } from 'src/app/modules/home/base-home.component';
import { HomeModel } from 'src/app/modules/home/home.model';

import { TmplService } from 'src/app/_services/tmpl.service';

@Component({
    selector: 'app-home',
    template: '<ng-template #homeContainer></ng-template>',
    providers: [TmplService]
})
export class ParentHomeComponent implements OnInit, OnDestroy {
    @ViewChild( 'homeContainer', { read: ViewContainerRef } ) homeContainer: ViewContainerRef;

    public componentRef: any;

    @Input() public bindings: any = {};

    constructor( private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>,
                private tmplService: TmplService) {
    }

    ngOnInit() {
        const pathHTML = './assets/_themes/theme_1/pages/home.html';
        const pathCSS = './assets/_themes/theme_1/assets/scss/home.scss';

        Promise.all([this.tmplService.getHTML(pathHTML), this.tmplService.getCSS(pathCSS)] ).then((res) => {
            this.tmplService.loadDynamicComponent(this.componentRef, this.homeContainer, res[0], res[1], BaseHomeComponent);
        });
    }

    ngOnDestroy() {
        if(this.componentRef) {
            this.componentRef.destroy();
        }
    }
}
