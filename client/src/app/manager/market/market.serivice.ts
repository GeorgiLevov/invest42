import { CompanyModel } from './../../models/companies/company.model';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class MarketService {


    constructor(private http: HttpClient, private appConfig: AppConfig) {}

    public getCompanies (): Observable<Object> {
        const url = `${this.appConfig.apiUrl}/view/market`;
        return this.http.get(url);
  }

    // public getCompanies( filtering = '', sortOrder = 'asc',
    // pageNumber = 0, pageSize = 3):  Observable<object> {

    //     const url = `${this.appConfig.apiUrl}/view/market`;
    //     return this.http.get(url, {
    //         params: new HttpParams()
    //         .set('filtering', filtering)
    //         .set('sortOrder', sortOrder)
    //         .set('pageNumber', pageNumber.toString())
    //         .set('pageSize', pageSize.toString())
    //     }).pipe(
    //         map(res => res)
    //     );
    // }
}
