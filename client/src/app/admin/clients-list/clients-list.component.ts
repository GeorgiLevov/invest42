import { ManagerData } from './../../models/interfaces/manager-data.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { ClientData } from '../../models/interfaces/client-data.model';
import { AddClientComponent } from '../admin-modals/add-client/add-client.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id',
    'fullname', 'email', 'address', 'availableBalance', 'icon', 'status', 'managerName', 'managerEmail', 'actions'];
  dataSource = new MatTableDataSource<ClientData>();

  index: number;

  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.getClients();
  }

  public getClients = () => {
    this.adminService.getClientsInfo()
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

  addNewClient() {
    const dialogRef = this.dialog.open(AddClientComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.adminService.dataChange.value.push(this.adminService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  startEdit() {
    // should be impl
  }

  private refreshTable() {
    this.getClients();
  }

}
