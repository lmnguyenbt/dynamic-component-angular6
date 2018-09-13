import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ParentPageNotFoundComponent } from 'src/app/modules/page-not-found/parent-page-not-found.component';
import { PageNotFoundRoutingModule } from 'src/app/modules/page-not-found/page-not-found-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PageNotFoundRoutingModule
    ],
    declarations: [
        ParentPageNotFoundComponent
    ]
})
export class PageNotFoundModule { }
