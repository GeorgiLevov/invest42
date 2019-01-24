import { CompanyModel } from './../../models/companies/company.model';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { PricesModel } from 'src/app/models/prices/prices.model';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
>>>>>>> 367e5cefb30514111ea359b1d106ab14873720ec


@Injectable()
export class MarketService {


    constructor(private http: HttpClient, private appConfig: AppConfig, private router: Router) {}

    public getCompanies (): Observable<object> {
        const url = `${this.appConfig.apiUrl}/view/market`;
        return this.http.get(url);
  }

  public getCompaniesAndPrices (): Observable<object> {
    const url = `${this.appConfig.apiUrl}/view/market/prices`;
    return this.http.get(url);
}

<<<<<<< HEAD
=======
  public goToCompanyProfilePage(companyId): any {
    this.router.navigate([`manager/market/company/${companyId}`]);
  }

>>>>>>> 367e5cefb30514111ea359b1d106ab14873720ec
}
