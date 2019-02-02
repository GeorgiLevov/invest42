import { AddManagerComponent } from './../admin-modals/add-manager/add-manager.component';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { EditManagerComponent } from '../admin-modals/edit-manager/edit-manager.component';
import { ManagerData } from '../../shared/models/interfaces/manager-data.model';


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
    this.getManagers();
  }

  public getManagers = () => {
    this.adminService.getManagers()
      .subscribe((res) => {
        this.dataSource.data = res as ManagerData[];
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

  startEdit(i, id, email, password) {
    this.id = id;
    this.index = i;

    const dialogRef = this.dialog.open(EditManagerComponent, {
      data: { id: id, email: email, password: password }
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
    this.getManagers();
  }

}
