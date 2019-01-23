import { Orders } from './orders.model';
import { Watchlist } from './watchlist.model';
import { MatTableDataSource } from '@angular/material';

export interface ClientOrders {

    id: number;
    fullname: string;
    email: string;
    dateOfCreation: string;
    age: number;
    address: string;
    availableBalance: number;
    icon: string;
    status: string;
    // orders: MatTableDataSource<Orders>;
    orders: Orders[];
    watchlist: Watchlist[];

}
