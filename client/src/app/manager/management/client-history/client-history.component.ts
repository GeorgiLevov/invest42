import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.css']
})
export class ClientHistoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'industry', 'units', 'prices', 'sellprice', 'profit'];
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
    this.getClientClosedOrders();
  }

  public getClientClosedOrders = () => {
    this.managerService.getClosedOrdersInfo(this.router.url.split('/')[3])
      .subscribe((res) => {
        this.dataSource.data = res;
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

  private refreshTable() {
    this.getClientClosedOrders();
  }


}
