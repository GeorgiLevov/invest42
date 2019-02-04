import { Orders } from './orders.model';
import { Watchlist } from './watchlist.model';

export interface ClientModel {

    id: number;
    fullname: string;
    email: string;
    dateOfCreation: string;
    age: number;
    address: string;
    availableBalance: number;
    icon: string;
    status: string;
    orders: Orders[];
    watchlist: Watchlist[];

}
