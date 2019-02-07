import { AppConfig } from '../../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../../shared/models/interfaces/user-data.model';
import { ManagerData } from '../../shared/models/interfaces/manager-data.model';
import { UserRegisterData } from '../../shared/models/user-register.model';
import { ClientRegisterData } from '../../shared/models/client-register.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig,
    ) { }

    getUserInfo(email: string): Observable<object> {
        return this.http.get(`${this.appConfig.apiUrl}/user/profile/${email}`);
    }

    getAdmins(): Observable<UserData[]> {
        return this.http.get<UserData[]>(`${this.appConfig.apiUrl}/user/admins`);
    }

    getManagers(): Observable<ManagerData[]> {
        return this.http.get<ManagerData[]>(`${this.appConfig.apiUrl}/user/managers`);
    }

    getClientsInfo(): Observable<ClientData[]> {
        return this.http.get<ClientData[]>(`${this.appConfig.apiUrl}/user/get-client-info`);
    }

    updateUser(user: any): Observable<object> {
        const id = user.id;
        const manager = user.manager;

        return this.http.post(`${this.appConfig.apiUrl}/user/update`, { id, manager });
    }

    addUser(user: UserRegisterData): Observable<UserData> {
        return this.http.post<UserData>(`${this.appConfig.apiUrl}/register/user`, user);
    }

    addClient(client: ClientRegisterData): Observable<ClientData> {
        return this.http.post<ClientData>(`${this.appConfig.apiUrl}/register/client`, client);
    }

    updateClient(client): Observable<object> {
        const managerEmail = client.newManagerEmail.email;
        const clientEmail = client.email;

        return this.http.post(`${this.appConfig.apiUrl}/user/assign-to-manager`, { managerEmail, clientEmail });
    }

}
