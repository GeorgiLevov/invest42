import { AdminService } from './../services/admin.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserData } from '../../models/interfaces/user-data.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['avatar', 'id', 'fullname', 'email', 'role', 'status', 'edit'];
  dataSource = new MatTableDataSource<UserData>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.getAdmins();
  }

  public getAdmins = () => {
    this.adminService.getAdmins()
      .subscribe((res) => {
        this.dataSource.data = res as UserData[];
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

  editAdmin() {

  }

}

