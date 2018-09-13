import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ParentHomeComponent } from 'src/app/modules/home/parent-home.component';
import { HomeRoutingModule } from 'src/app/modules/home/home-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HomeRoutingModule
    ],
    declarations: [
        ParentHomeComponent
    ]
})
export class HomeModule { }
