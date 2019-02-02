import { Router } from '@angular/router';
import { MarketService } from './market.serivice';
import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ManagerService } from '../../services/manager.service';
import { PricesModel } from '../../../shared/models/prices/prices.model';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements AfterViewInit, OnInit {

  prices: PricesModel[];
  displayedColumns = ['name', 'industry', 'endprice', 'opendate', 'more'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private marketService: MarketService,
    private managerService: ManagerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.returnWithPrices();
  }

  public returnWithPrices = () => {
    this.managerService.getMarketInfo()
      .subscribe((res: any) => {
        this.dataSource.data = res;
        // console.log(res);
        // this.managerService.clientDataChange.next(res); // added
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
