import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort, MatSort } from '@angular/material';
import { ClientModel } from '../../../shared/models/interfaces/client.model';
import { Orders } from '../../../shared/models/interfaces/orders.model';
import { ManagerService } from '../../services/manager.service';

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
    this.managerService.getClientOrders().subscribe((data: any) => {
      this.clients = data as ClientModel[];
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

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

