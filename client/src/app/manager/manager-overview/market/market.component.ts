import { Router } from '@angular/router';
import { MarketService } from './market.serivice';
import { Component, OnInit, AfterViewInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ManagerService } from '../../services/manager.service';
import { PricesModel } from '../../../shared/models/prices/prices.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements AfterViewInit, OnInit, OnDestroy {

  prices: PricesModel[];
  displayedColumns = ['name', 'industry', 'highprice', 'endprice', 'opendate', 'more'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription;

  constructor(
    private marketService: MarketService,
    private managerService: ManagerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subscription = this.returnWithPrices().subscribe((res: any) => {
      this.dataSource.data = res;
      setInterval((): any => {
        (this.dataSource.data).forEach((company) => {
          const direction = (Math.random() >= 0.5) ? 1 : -1;
          let priceToUpdate = ((direction * Math.random()) + company.endprice);
          priceToUpdate = Number(priceToUpdate).toFixed(2);
          if (priceToUpdate >= company.lowprice && priceToUpdate <= company.highprice) {
            company.endprice = Number(priceToUpdate);
          }
        });
      }, 1000);

    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public returnWithPrices = () => {
   return this.managerService.getMarketInfo();
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

}
