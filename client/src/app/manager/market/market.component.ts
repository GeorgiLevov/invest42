import { CompanyModel } from './../../models/companies/company.model';
import { MarketService } from './market.serivice';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor(
    private marketService: MarketService,
  ) { }
  public companies: CompanyModel[];

  public viewMarket() {

    this.marketService.getCompanies()
    .subscribe((data: CompanyModel[]) => {
      this.companies = data;
      console.log(data);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.viewMarket();
  }


}
