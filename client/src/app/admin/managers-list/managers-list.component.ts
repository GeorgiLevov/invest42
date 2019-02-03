import { AddManagerComponent } from './../admin-modals/add-manager/add-manager.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { EditManagerComponent } from '../admin-modals/edit-manager/edit-manager.component';
import { ManagerData } from '../../shared/models/interfaces/manager-data.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css']
})
export class ManagersListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'avatar',
    'fullname',
    'email',
    'status',
    'clients',
    'actions'];
  dataSource = new MatTableDataSource<ManagerData>();

  @ViewChild('dynamicTable') myTable: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 private subscription: Subscription;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.subscription = this.getManagers().subscribe((res) => {
      this.dataSource.data = res as ManagerData[];
    });
  }

  public getManagers = () => {
    return this.adminService.getManagers();
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

  addNewManager() {
    const dialogRef = this.dialog.open(AddManagerComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.applyFilter('');
      }
    });
  }

  startEdit(id, email, password) {
    const dialogRef = this.dialog.open(EditManagerComponent, {
      data: { id: id, email: email, password: password }
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
    this.subscription = this.getManagers().subscribe((res) => {
      this.dataSource.data = res as ManagerData[];
    });
  }

}
