import { ClientOrders } from './../../models/interfaces/client.model';
import { UserRegisterData } from './../../models/user-register.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserData } from '../../models/interfaces/user-data.model';
import { ManagerData } from '../../models/interfaces/manager-data.model';
import { ClientData } from '../../models/interfaces/client-data.model';
import { ClientRegisterData } from '../../models/client-register.model';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    private apiUrl = 'http://localhost:5500';

    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

    dialogData: any;

    constructor(

        private http: HttpClient,

        private toastService: ToastrService,

    ) { }


    getClientsInfo(): Observable<ClientData[]> {
        return this.http.get<ClientData[]>(`${this.apiUrl}/view/clients`);
    }

    getClientOrders(): Observable<ClientOrders[]> {
        return this.http.get<ClientOrders[]>(`${this.apiUrl}/view/clients/orders`);
    }

    getDialogData() {
        return this.dialogData;
    }
    get data(): UserData[] { // added
        return this.dataChange.value;
    }

}
