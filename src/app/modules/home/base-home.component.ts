import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component( {} )
export class BaseHomeComponent {

    public message: string;

    constructor( private router: Router ) {
        this.message = 'Hello Base Home Component';
    }

    changePage() {
        this.router.navigate( [ `/page-not-found` ] );
    }
}
