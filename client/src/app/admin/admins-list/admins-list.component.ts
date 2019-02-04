import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { EditAdminComponent } from '../admin-modals/edit-admin/edit-admin.component';
import { AddAdminComponent } from '../admin-modals/add-admin/add-admin.component';
import { UserData } from '../../shared/models/interfaces/user-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = [
    'id',
    'avatar',
    'fullname',
    'email',
    'status',
    'actions'];
  dataSource = new MatTableDataSource<UserData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    public subscription: Subscription;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.subscription = this.getAdmins().subscribe((res) => {
      this.dataSource.data = res as UserData[];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getAdmins = () => {
    return this.adminService.getAdmins();
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
      if (result) {
        this.dataSource.data.push(result);
        this.applyFilter('');
      }
    });
  }

  startEdit(id, email, password) {
    const dialogRef = this.dialog.open(EditAdminComponent, {
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
    return this.subscription = this.getAdmins().subscribe((res) => {
      this.dataSource.data = res as UserData[];
    });
  }
}

