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

  public logCompanies() {
    // console.log(this.companies);
  }

<<<<<<< HEAD
  public returnCompanies() {
    this.marketService.getCompanies()
      .subscribe(
        (companies: CompanyModel[]) => {
          if (companies === undefined || companies === null) { return; }
          this.companies = companies;
          // console.log(this.companies);
          this.dataSource = new MatTableDataSource(companies);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // console.log(this.dataSource);
        },
        error => // console.log(error),
          () => {
            // console.log('companies finished loading');
          });
  }
=======
  // public returnCompanies() {
  //   this.marketService.getCompanies()
  //   .subscribe(
  //   (companies: CompanyModel[]) => {
  //     if (companies === undefined || companies === null) { return; }
  //     this.companies = companies;
  //     console.log(this.companies);
  //     this.dataSource = new MatTableDataSource(companies);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     console.log(this.dataSource);
  //     },
  //   error => console.log(error),
  //   () => {
  //     console.log('companies finished loading');
  //   });
  // }

  public uprateCompanyObjects(companies, prices) {
    const findId = (id) => prices.find( price => price.__company__.id === id);
    companies.forEach(company => Object.assign(company, findId(company.id)));
    return companies;
    }

  public returnWithPrices() {
  this.marketService.getCompaniesAndPrices()
  .subscribe(
    (companiesWithPrice: any) => {
      this.companies = companiesWithPrice.companies as CompanyModel[] ;
      console.log(this.companies);
      this.prices = companiesWithPrice.prices as PricesModel[] ;
      this.dataSource = new MatTableDataSource(this.uprateCompanyObjects(this.companies, this.prices));
    },
    error => console.log(error),
    // () => console.log('ReturnWithPricesIsReady')
    );
}

    companyProfile(id) {
      this.marketService.goToCompanyProfilePage(id);
      console.log('component');
    }
>>>>>>> 367e5cefb30514111ea359b1d106ab14873720ec

  ngOnInit() {
    this.returnWithPrices();


    // this.returnWithPrices();
  }

  ngAfterViewInit() {
  }

<<<<<<< HEAD
  onRowClicked(row) {
    // console.log('Row clicked: ', row);
  }
=======

>>>>>>> 367e5cefb30514111ea359b1d106ab14873720ec

}
