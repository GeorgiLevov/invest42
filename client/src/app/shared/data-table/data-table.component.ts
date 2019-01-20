import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor() { }
 public displayedColumns = ['icon', 'name', 'abbr', 'address'];

  ngOnInit() {
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
}

}
