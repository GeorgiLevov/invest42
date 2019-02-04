import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from '../../services/manager.service';
import { BuyOrderComponent } from '../../manager-modals/buy-modal/buy-order.component';

@Component({
  selector: 'app-client-watchlist',
  templateUrl: './client-watchlist.component.html',
  styleUrls: ['./client-watchlist.component.css']
})
export class ClientWatchlistComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'industry', 'startprice', 'currentprice', 'buy', 'removeFromWatchlsit'];
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getMarketInfo = () => {
    this.managerService.getWatchlist(this.clientId)
      .subscribe((res) => {
        this.dataSource.data = res;

      });
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

  removeFromWatchlsit(companyId) {
    this.managerService.removeFromWatchlist(this.clientId, companyId)
      .subscribe((data) => {
        this.toastr.success('', 'Successfully removed from watchlist', { timeOut: 1000 });
      });
  }

  private refreshTable() {
    this.getMarketInfo();
  }

}
