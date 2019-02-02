import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'icon', 'fullname', 'email', 'actions'];
  dataSource = new MatTableDataSource<ClientData>();

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
    this.getClients();
  }

  public getClients = () => {
    this.managerService.getClientsInfo()
      .subscribe((res) => {
        this.dataSource.data = res as ClientData[];
        // this.adminService.dataChange.next(res); // added
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
    this.getClients();
  }

  manage(clientId) {
    this.router.navigate([`manager/client/${clientId}`]);
  }

}
