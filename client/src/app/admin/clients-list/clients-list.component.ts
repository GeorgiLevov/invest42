import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { ClientData } from '../../models/interfaces/client-data.model';
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

  index: number;

  id: number;

  @ViewChild('dynamicTable') myTable: any;
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
      if (result) {
        this.dataSource.data.push(result);
        this.applyFilter('');
      }
    });
  }

  startEdit(i, id, email, managerEmail) {
    this.id = id;
    this.index = i;

    const dialogRef = this.dialog.open(EditClientComponent, {
      data: { id: id, email: email, managerEmail: managerEmail }
    });

    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('dialogRefAfterClose:' , result);
          this.dataSource.data.push(result);
          this.applyFilter('');
        }
    });
  }

  private refreshTable() {
    this.getClients();
  }

}
