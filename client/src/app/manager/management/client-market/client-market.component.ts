import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { BuyOrderComponent } from '../../manager-modals/buy-modal/buy-order.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-client-market',
  templateUrl: './client-market.component.html',
  styleUrls: ['./client-market.component.css']
})
export class ClientMarketComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'industry', 'highprice', 'currentprice', 'buy', 'addToWatchlsit'];
  dataSource = new MatTableDataSource<any>();
  index: number;
  id: number;

  clientId = this.router.url.split('/')[3];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription1: Subscription;

  constructor(
    private managerService: ManagerService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    this.subscription1 = this.getMarketInfo().subscribe((res) => {
      this.dataSource.data = res;
      setInterval((): any => {
        (this.dataSource.data).forEach((company) => {
          const direction = (Math.random() >= 0.5) ? 1 : -1;
          let priceToUpdate = ((direction * Math.random()) + company.currentprice);
          priceToUpdate = Number(priceToUpdate).toFixed(2);
          if (priceToUpdate >= company.lowprice && priceToUpdate <= company.highprice ) {
            company.currentprice = Number(priceToUpdate);
          }
        });
      }, 1000);
    });

  }

  public getMarketInfo = () => {
  return this.managerService.getMarketInfo();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buy(companyId, currentprice) {
    const dialogRef = this.dialog.open(BuyOrderComponent, {
      data: { clientId: this.router.url.split('/')[3], companyId: companyId, currentprice: currentprice }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getMarketInfo();
      }
    });
  }

  addToWatchlsit(companyId) {

    this.managerService.addToWatchlist(this.clientId, companyId).subscribe((data) => {
        this.toastr.success('', 'Successfully added to watchlist', { timeOut: 1000 });
      });
  }

}
