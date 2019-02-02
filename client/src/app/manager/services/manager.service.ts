import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserData } from '../../shared/models/interfaces/user-data.model';
import { ClientModel } from '../../shared/models/interfaces/client.model';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    private apiUrl = 'http://localhost:5500';

    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

    clientDataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    dialogData: any;

    constructor(

        private http: HttpClient,

        private toastService: ToastrService,

    ) { }


    getClientsInfo(): Observable<ClientData[]> {
        return this.http.get<ClientData[]>(`${this.apiUrl}/view/clients`);
    }

    getClientOrders(): Observable<ClientData[]> { // here working
        return this.http.get<ClientData[]>(`${this.apiUrl}/view/clients/orders`);
    }

    getDialogData() {
        return this.dialogData;
    }
    get data(): UserData[] { // added
        return this.dataChange.value;
    }

    getClientPortfolio(clientId: string): Observable<ClientModel> {
        return this.http.get<ClientModel>(`${this.apiUrl}/client/portfolio/${clientId}`);
    }

    updateBalance(data): Observable<object> {
        // console.log('data', data);
        let info;
        if (data.isDeposit) {
            info = {
                id: data.id,
                balance: Number(data.balance)
            };
        } else {
            info = {
                id: data.id,
                balance: 0 - Number(data.balance)
            };
        }
        console.log('info: ', info);

        return this.http.post(`${this.apiUrl}/client/balance/update`, info);
    }

    updateClientInfo(data): Observable<object> {
        const info = {
            id: data.id,
            email: data.newClientEmail,
            address: data.newClientAddress,
        };
        return this.http.post(`${this.apiUrl}/client/update`, info);
    }

    getActiveOrdersInfo(clientId): Observable<object[]> {
        return this.http.get<object[]>(`${this.apiUrl}/client/activeOrders/${clientId}`);
    }

    getClosedOrdersInfo(clientId): Observable<object[]> {
        return this.http.get<object[]>(`${this.apiUrl}/client/closedOrders/${clientId}`);
    }

    updateOrder(data): Observable<object> {
        console.log(data);
        let info;
        if (!data.isSell) {
            info = {
                id: data.id,
                units: 0 - Number(data.quantity),
                clientId: data.clientId,
                buyprice: data.buyprice,
            };
        } else {
            info = {
                id: data.id,
                units: Number(data.quantity),
                clientId: data.clientId,
                buyprice: data.buyprice,
            };
        }
        // console.log(info);

        return this.http.post(`${this.apiUrl}/client/units/update`, info);
    }

    getMarketInfo(): Observable<object[]> {
        return this.http.get<object[]>(`${this.apiUrl}/client/market`);
    }

    buyStocks(data): Observable<object> {

        const info = {
            clientId: data.clientId,
            companyId: data.companyId,
            currentprice: +data.currentprice,
            quantity: +data.quantity,
            sellprice: +data.sellprice,
            stopLoss: +data.stopLoss,
            takeProfit: +data.takeProfit
        };

        return this.http.post(`${this.apiUrl}/client/buy`, info);
    }

    addToWatchlist(clientId, companyId): Observable<object> {
        // console.log({ clientId, companyName });
        return this.http.post(`${this.apiUrl}/client/watchlist/add`, { clientId, companyId });
    }

    removeFromWatchlist(clientId, companyId): Observable<object> {
        // console.log({ clientId, companyName });
        return this.http.post(`${this.apiUrl}/client/watchlist/remove`, { clientId, companyId });
    }

    getWatchlist(clientId): Observable<object[]> {
        // console.log({ clientId, companyName });
        return this.http.get<object[]>(`${this.apiUrl}/client/watchlist/${clientId}`);
    }

}
