import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { UpdateOrderComponent } from '../../manager-modals/update-order/update-order.component';

@Component({
  selector: 'app-client-positions',
  templateUrl: './client-positions.component.html',
  styleUrls: ['./client-positions.component.css'],
})
export class ClientPositionsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'industry', 'buyprice', 'sellprice', 'units', 'sell'];
  dataSource = new MatTableDataSource<any>();
  index: number;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private managerService: ManagerService,
    private dialog: MatDialog,
    private router: Router,
  ) { }


  ngOnInit() {
    this.getClientActiveOrders();
  }

  public getClientActiveOrders = () => {
    this.managerService.getActiveOrdersInfo(this.router.url.split('/')[3])
      .subscribe((res) => {
        this.dataSource.data = res;
        // console.log(res);
        // this.managerService.clientDataChange.next(res); // added
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

  sell(orderId, units, sellprice) {
    const dialogRef = this.dialog.open(UpdateOrderComponent, {
      data: { id: orderId, units: units, isSell: false, clientId: this.router.url.split('/')[3], buyprice: sellprice }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getClientActiveOrders();
      }
    });
  }

  private refreshTable() {
    this.getClientActiveOrders();
  }

}
