import { Router } from '@angular/router';
import { PricesModel } from './../../models/prices/prices.model';
import { MarketService } from './market.serivice';
import { CompanyModel } from './../../models/companies/company.model';
import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements AfterViewInit, OnInit {

  dataSource: MatTableDataSource<CompanyModel>;
  constructor(
    private marketService: MarketService,
    private router: Router,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  companies: CompanyModel[];

  prices: PricesModel[];

  displayedColumns = ['name', 'industry', 'price', 'more'];

  public uprateCompanyObjects(companies, prices) {
    const findId = (id) => prices.find(price => price.__company__.id === id);
    companies.forEach(company => Object.assign(company, findId(company.id)));
    return companies;
  }

  public returnWithPrices() {
    this.marketService.getCompaniesAndPrices()
      .subscribe(
        (companiesWithPrice: any) => {
          this.companies = companiesWithPrice.companies as CompanyModel[];
          // console.log(this.companies);
          this.prices = companiesWithPrice.prices as PricesModel[];
          this.dataSource = new MatTableDataSource(this.uprateCompanyObjects(this.companies, this.prices));

          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        },
        error => console.log(error),
      );
  }

  companyProfile(id) {
    this.marketService.goToCompanyProfilePage(id);
    // console.log('component');
  }

  ngOnInit() {
    this.returnWithPrices();
  }

  ngAfterViewInit() {
  }

  private refreshTable() {
    this.returnWithPrices();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
