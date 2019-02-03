import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../../shared/models/interfaces/client.model';
import { AppConfig } from '../../config/app.config';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig,
    ) { }

    getClientsInfo(): Observable<ClientData[]> {
        return this.http.get<ClientData[]>(`${this.appConfig.apiUrl}/view/clients`);
    }

    getClientOrders(): Observable<ClientData[]> {
        return this.http.get<ClientData[]>(`${this.appConfig.apiUrl}/view/clients/orders`);
    }

    getClientPortfolio(clientId: string): Observable<ClientModel> {
        return this.http.get<ClientModel>(`${this.appConfig.apiUrl}/client/portfolio/${clientId}`);
    }

    updateBalance(data): Observable<object> {

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

        return this.http.post(`${this.appConfig.apiUrl}/client/balance/update`, info);
    }

    updateClientInfo(data): Observable<object> {
        const info = {
            id: data.id,
            email: data.newClientEmail,
            address: data.newClientAddress,
        };
        return this.http.post(`${this.appConfig.apiUrl}/client/update`, info);
    }

    getActiveOrdersInfo(clientId): Observable<object[]> {
        return this.http.get<object[]>(`${this.appConfig.apiUrl}/client/activeOrders/${clientId}`);
    }

    getClosedOrdersInfo(clientId): Observable<object[]> {
        return this.http.get<object[]>(`${this.appConfig.apiUrl}/client/closedOrders/${clientId}`);
    }

    updateOrder(data): Observable<object> {

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

        return this.http.post(`${this.appConfig.apiUrl}/client/units/update`, info);
    }

    getMarketInfo(): Observable<object[]> {
        return this.http.get<object[]>(`${this.appConfig.apiUrl}/client/market`);
    }

    buyStocks(data): Observable<object> {
        const info = {
            clientId: data.clientId,
            companyId: data.companyId,
            currentprice: +data.currentprice,
            quantity: +data.quantity,
            sellprice: +data.currentprice,
            // stopLoss: +data.stopLoss,
            // takeProfit: +data.takeProfit
        };

        return this.http.post(`${this.appConfig.apiUrl}/client/buy`, info);
    }

    addToWatchlist(clientId, companyId): Observable<object> {

        return this.http.post(`${this.appConfig.apiUrl}/client/watchlist/add`, { clientId, companyId });
    }

    removeFromWatchlist(clientId, companyId): Observable<object> {

        return this.http.post(`${this.appConfig.apiUrl}/client/watchlist/remove`, { clientId, companyId });
    }

    getWatchlist(clientId): Observable<object[]> {

        return this.http.get<object[]>(`${this.appConfig.apiUrl}/client/watchlist/${clientId}`);
    }

}
