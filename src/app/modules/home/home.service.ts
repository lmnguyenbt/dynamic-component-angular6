import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Injectable()
export class HomeService {
    public token: string;

    constructor( private ApiService: ApiService ) {
    }

}
