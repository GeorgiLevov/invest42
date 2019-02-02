import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { UserData } from '../../models/interfaces/user-data.model';
import { EditAdminComponent } from '../admin-modals/edit-admin/edit-admin.component';
import { AddAdminComponent } from '../admin-modals/add-admin/add-admin.component';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
   'id',
   'avatar',
   'fullname',
   'email',
   'status',
   'actions'];
  dataSource = new MatTableDataSource<UserData>();
 
  index: number;

  id: number;

  role: string;

  @ViewChild('dynamicTable') myTable: any;
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

  startEdit(i, id, email, password) {
    this.id = id;
    this.index = i;
    // console.log(this.index); // for debugging / can be removed

    const dialogRef = this.dialog.open(EditAdminComponent, {
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
    this.getAdmins();
  }

}

