import { MarketService } from './market.serivice';
import { CompanyModel } from './../../models/companies/company.model';
import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// import { MarketDataSource } from './company.data-source';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { tap, mergeMap } from 'rxjs/operators';
import { DataTableDataSource, CompanyData } from './company.data-source';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements AfterViewInit, OnInit {

  dataSource: MatTableDataSource<CompanyModel>;
  displayedColumns = ['name'];

  constructor(
    private marketService: MarketService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  companies: CompanyModel[];

  public logCompanies() {
    // console.log(this.companies);
  }

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

  ngOnInit() {
    this.returnCompanies();
  }

  ngAfterViewInit() {
  }

  onRowClicked(row) {
    // console.log('Row clicked: ', row);
  }

}
