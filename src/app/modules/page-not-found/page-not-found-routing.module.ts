import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentPageNotFoundComponent } from 'src/app/modules/page-not-found/parent-page-not-found.component';

const routes: Routes = [
    {
        path: '',
        component: ParentPageNotFoundComponent
    }
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
} )
export class PageNotFoundRoutingModule {
}
