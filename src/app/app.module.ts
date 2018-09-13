import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// Layouts
import { LayoutComponent } from 'src/app/_layouts/layout.component';

import { AppComponent } from './app.component';

import { ParentHeaderComponent } from 'src/app/_layouts/header/parent-header.component';
import { ParentFooterComponent } from 'src/app/_layouts/footer/parent-footer.component';

// Routing for app
import {AppRouting} from 'src/app/app.routing';

// Service for app
import { ApiService } from 'src/app/_services/api.service';
import { JwtService } from 'src/app/_services/jwt.service';
import { AuthGuard } from 'src/app/_guards/auth.guard';

@NgModule( {
    declarations: [
        AppComponent,
        LayoutComponent,
        ParentHeaderComponent,
        ParentFooterComponent
    ],
    imports: [
        AppRouting,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        //NgbModule.forRoot(),
        //ToastrModule.forRoot(),
        //NgIdleKeepaliveModule.forRoot()
    ],
    providers: [
        AuthGuard,
        JwtService,
        ApiService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [ AppComponent ]
} )
export class AppModule {
}
