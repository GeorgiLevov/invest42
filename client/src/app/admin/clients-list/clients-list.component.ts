import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { AddClientComponent } from '../admin-modals/add-client/add-client.component';
import { EditClientComponent } from '../admin-modals/edit-client/edit-client.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'icon',
    'fullname',
    'email',
    'address',
    'availableBalance',
    'status',
    'managerName',
    'actions'];
  dataSource = new MatTableDataSource<ClientData>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.subscription = this.getClients().subscribe((res) => {
      this.dataSource.data = res as ClientData[];
    });
  }

  public getClients = () => {
   return this.adminService.getClientsInfo();
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
      if (result) {
        this.dataSource.data.push(result);
        this.applyFilter('');
      }
    });
  }

  startEdit(id, email, managerEmail) {
    const dialogRef = this.dialog.open(EditClientComponent, {
      data: { id: id, email: email, managerEmail: managerEmail }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => {
          this.refreshTable();
        }, 100);
      }
    });
  }

  private refreshTable() {
    return this.subscription = this.getClients().subscribe((res) => {
      this.dataSource.data = res as ClientData[];
    });
  }

}
