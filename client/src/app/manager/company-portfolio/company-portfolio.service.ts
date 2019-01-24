import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';
import { Router } from '@angular/router';

@Injectable()
export class CompanyPortfolioService {


    constructor(private http: HttpClient, private appConfig: AppConfig, private router: Router) { }


    public getCompany(companyId: string): Observable<object> {
        const url = `${this.appConfig.apiUrl}/view/market/company/${companyId}`;
        return this.http.get(url);
    }

}

