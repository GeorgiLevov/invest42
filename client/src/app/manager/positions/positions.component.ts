import { ManagerService } from './../services/manager.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Sort, MatSort, MatTableDataSource } from '@angular/material';
import { ClientModel } from '../../models/interfaces/client.model';
import { Orders } from '../../models/interfaces/orders.model';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  clients: ClientModel[];

  sortedData: Orders[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private managerService: ManagerService,

  ) { }


  ngOnInit() {
    this.initializeClients();
  }

  initializeClients() {
    this.managerService.getClientOrders().subscribe((data) => {
      this.clients = data as ClientModel[];
      this.sortedData = this.clients[0].orders;

      this.clients.map((client: any) => {
        client.orders = client.__orders__;
      });
    },
      (err) => { console.log('Error from client orders: ', err); });
  }

  sortData(sort: Sort, index: number) {

    const data = this.clients[index].orders.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'units': return compare(a.units, b.units, isAsc);
        case 'closedate': return compare(a.closedate, b.closedate, isAsc);
        case 'buyprice': return compare(a.buyprice, b.buyprice, isAsc);
        default: return 0;
      }
    });

    this.clients[index].orders = this.sortedData;
  }


  generateTable(orders): string {

    // return `<h1>TEST</h1>`;
    return orders;
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

