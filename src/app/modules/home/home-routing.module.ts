import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentHomeComponent } from 'src/app/modules/home/parent-home.component';

const routes: Routes = [
    {
        path: '',
        component: ParentHomeComponent
    }
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
} )
export class HomeRoutingModule {
}
