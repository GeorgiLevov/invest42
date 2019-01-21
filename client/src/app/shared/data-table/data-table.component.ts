import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  @Input() dataSource: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name'];

  ngOnInit() {
    // this.dataSource = new DataTableDataSource(this.paginator, this.sort);
  }
}
