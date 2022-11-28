import { environment as ENV} from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONSTANT } from './constant';

@Injectable()

export class HttpInterceptor {
    constructor(protected http: HttpClient) { }

    /*
    Http post interceptor
    */
    Post(URL: string, Headers = {}, Parameter: any) {
        let  headers: any = Headers? { 'apikey': ENV.API_KEY, ...Headers } : { 'apikey': ENV.API_KEY };
        return this.http.post(URL, Parameter, { headers })
    }
 
    /*
    Http get interceptor
    */
    Get(URL: string, Headers = {}) {
        let  headers: any = Headers? { 'apikey': ENV.API_KEY, ...Headers } : { 'apikey': ENV.API_KEY };
        return this.http.get(URL, { headers })
    }
}