import { ToastrService } from 'ngx-toastr';
import { BuyOrderComponent } from './../manager-modals/buy-modal/buy-order.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ManagerService } from '../services/manager.service';
import { Router } from '@angular/router';
import { UpdateOrderComponent } from '../manager-modals/update-order/update-order.component';


@Component({
  selector: 'app-client-market',
  templateUrl: './client-market.component.html',
  styleUrls: ['./client-market.component.css']
})
export class ClientMarketComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'industry', 'startprice', 'currentprice', 'addToWatchlsit', 'buy', 'sell'];
  dataSource = new MatTableDataSource<any>();
  index: number;
  id: number;

  clientId = this.router.url.split('/')[3];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private managerService: ManagerService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    // (this.router.url.split('/')[3]
    this.getMarketInfo();
  }

  public getMarketInfo = () => {
    this.managerService.getMarketInfo()
      .subscribe((res) => {
        this.dataSource.data = res;
        this.managerService.clientDataChange.next(res); // added
        // console.log(res);
      });
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
    // console.log(this.clientId, companyName);
    this.managerService.addToWatchlist(this.clientId, companyId)
      .subscribe((data) => {
        this.toastr.success('', 'Successfully added to watchlist', { timeOut: 1000 });
        // console.log(data);
      });
  }

  private refreshTable() {
    this.getMarketInfo();
  }

}
