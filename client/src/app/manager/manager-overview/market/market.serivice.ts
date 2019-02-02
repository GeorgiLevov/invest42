
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Injectable()
export class MarketService {

  constructor(private http: HttpClient, private appConfig: AppConfig, private router: Router) { }

  public getCompanies(): Observable<object> {
    const url = `${this.appConfig.apiUrl}/view/market`;
    return this.http.get(url);
  }

  public getCompaniesAndPrices(): Observable<object> {
    const url = `${this.appConfig.apiUrl}/view/market/prices`;
    return this.http.get(url);
  }

  public goToCompanyProfilePage(companyId): any {
    this.router.navigate([`manager/market/company/${companyId}`]);
  }

}
