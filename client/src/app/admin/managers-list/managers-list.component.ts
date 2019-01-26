import { AddManagerComponent } from './../admin-modals/add-manager/add-manager.component';
import { ManagerData } from './../../models/interfaces/manager-data.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { EditManagerComponent } from '../admin-modals/edit-manager/edit-manager.component';


@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css']
})
export class ManagersListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['avatar', 'id', 'fullname', 'email', 'role', 'status', 'clients', 'actions'];
  dataSource = new MatTableDataSource<ManagerData>();

  index: number;

  id: number;

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
        this.adminService.dataChange.next(res); // added
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
      if (result === 1) {
        this.adminService.dataChange.value.push(this.adminService.getDialogData());
      }
    });
  }

  startEdit(i, id, email, password) {
    this.id = id;
    this.index = i;
    // console.log(this.index); // for debugging / can be removed

    const dialogRef = this.dialog.open(EditManagerComponent, {
      data: { id: id, email: email, password: password }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.adminService.dataChange.value.findIndex((x: any) => x.id === this.id);
        this.adminService.dataChange.value[foundIndex] = this.adminService.getDialogData();
      }
    });
  }

  private refreshTable() {
    this.getManagers();
  }

}
