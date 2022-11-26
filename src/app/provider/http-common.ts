import { environment as ENV} from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONSTANT } from './constant';

@Injectable()

export class Connector {
    constructor(protected http: HttpClient) { }

    /*
    TODO: post interceptor
    */
    Post(URL: any, Parameter: any) {
        var headers: any = { 'apikey': ENV.API_KEY };
        return this.http.post(URL, Parameter, { headers })
    }
 
    /*
    TODO: get interceptor
    */
    Get(URL: any) {
        var headers: any = { 'apikey': ENV.API_KEY };
        return this.http.get(URL, { headers })
    }
}