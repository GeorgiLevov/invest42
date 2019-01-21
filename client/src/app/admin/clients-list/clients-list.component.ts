import { ManagerData } from './../../models/interfaces/manager-data.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['avatar', 'id', 'fullname', 'email', 'role', 'status', 'actions'];
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
    //  this.getManagers();
  }


  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }


}
