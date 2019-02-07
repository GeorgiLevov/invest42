import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClientData } from '../../../../shared/models/interfaces/client-data.model';

@Injectable({
    providedIn: 'root'
})
export class ManagerServiceMock {

    constructor() { }

    getClientsInfo(): Observable<ClientData[]> {

        const mockProfile1: ClientData = {
            id: '1',
            fullname: 'Mock User',
            email: 'mock_email@gmail.com',
            address: 'address',
            availableBalance: '5900',
            icon: 'images\default.png',
            status: 'ACTIVE',
            managerName: 'Mock Manager',
            managerEmail: 'mock_manager@gmail.com',
        };


        return of([mockProfile1]);
    }



}
