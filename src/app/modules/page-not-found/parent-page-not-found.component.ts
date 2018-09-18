import {
    Compiler, Component, Injector, NgModule, NgModuleRef,
    ViewContainerRef, OnInit, ViewChild, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule } from '@angular/router';

import { TmplService } from 'src/app/_services/tmpl.service';
import { BasePageNotFoundComponent } from 'src/app/modules/page-not-found/base-page-not-found.component';

@Component({
    selector: 'app-page-not-found',
    template: '<ng-template #pageNotFoundContainer></ng-template>',
    providers: [TmplService]
})
export class ParentPageNotFoundComponent implements OnInit, OnDestroy {
    @ViewChild( 'pageNotFoundContainer', { read: ViewContainerRef } ) pageNotFoundContainer: ViewContainerRef;

    public componentRef: any;

    constructor(private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>,
                private tmplService: TmplService) {
    }

    ngOnInit() {
        const pathHTML = './assets/_themes/theme_1/pages/page-not-found.html';
        const pathCSS = './assets/_themes/theme_1/assets/scss/page-not-found.scss';

        Promise.all([this.tmplService.getHTML(pathHTML), this.tmplService.getCSS(pathCSS)] ).then((res) => {
            this.tmplService.loadDynamicComponent(this.componentRef, this.pageNotFoundContainer, res[0], res[1], BasePageNotFoundComponent);
        });
    }

    ngOnDestroy() {
        if ( this.componentRef ) {
            this.componentRef.destroy();
        }
    }
}
