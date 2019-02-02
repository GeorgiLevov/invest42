import { HttpHeaders, HttpParams } from '@angular/common/http';

export class HttpOptions {

    body?: any;
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'json';
    withCredentials?: boolean;
}
