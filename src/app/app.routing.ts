import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { LayoutComponent } from 'src/app/_layouts/layout.component';


export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './modules/home/home.module#HomeModule',
            },
            {
                path: 'page-not-found',
                loadChildren: './modules/page-not-found/page-not-found.module#PageNotFoundModule',
            }
            /*{
                path: 'login',
                loadChildren: './modules/login/login.module#LoginModule'
            },
            {
                path:'access-denied',
                loadChildren: './modules/pages/access-denied/access-denied.module#AccessDeniedModule'
            },
            {
                path:'forgot-password',
                loadChildren: './modules/pages/forgot-password/forgot-password.module#ForgotPasswordModule'
            },*/
        ]
    },
    {
        path:'**',
        redirectTo:'page-not-found',
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { enableTracing: false }) ],
    exports: [ RouterModule ]
})

export class AppRouting {}
