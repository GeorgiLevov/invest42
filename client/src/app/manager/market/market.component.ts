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


  // companies: CompanyModel[];
  prices: PricesModel[];
  displayedColumns = ['name', 'industry', 'endprice', 'more'];
  dataSource = new MatTableDataSource<PricesModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private marketService: MarketService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.returnWithPrices();
  }

  public returnWithPrices() {
    this.marketService.getCompaniesAndPrices()
      .subscribe((PricesWithCompanies: PricesModel[]) => {
          this.dataSource.data = PricesWithCompanies as PricesModel[];
      });
  }

  companyProfile(id) {
    this.marketService.goToCompanyProfilePage(id);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private refreshTable() {
    this.returnWithPrices();
  }

}
