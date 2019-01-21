import { AddAdminComponent } from './../admin-modals/add-modal/add-admin.component';
import { UserRegisterData } from './../../models/user-register.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { UserData } from '../../models/interfaces/user-data.model';
import { EditAdminComponent } from '../admin-modals/edit-modal/edit-admin.component';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['avatar', 'id', 'fullname', 'email', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource<UserData>();

  // dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

  // dialogData: any;

  index: number;

  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAdmins();
  }

  public getAdmins = () => {
    this.adminService.getAdmins()
      .subscribe((res) => {
        this.dataSource.data = res as UserData[];
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

  addNewUser() {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.adminService.dataChange.value.push(this.adminService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  startEdit(i, id, email, password) {
    this.id = id;
    this.index = i;
    // console.log(this.index); // for debugging / can be removed

    const dialogRef = this.dialog.open(EditAdminComponent, {
      data: { id: id, email: email, password: password }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.adminService.dataChange.value.findIndex((x: any) => x.id === this.id);
        this.adminService.dataChange.value[foundIndex] = this.adminService.getDialogData();
        // this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.getAdmins();
  }

}

