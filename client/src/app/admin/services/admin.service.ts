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
export class AdminService {

    private apiUrl = 'http://localhost:5500';

    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

    dialogData: any;

    constructor(

        private http: HttpClient,

        private toastService: ToastrService,

    ) { }

    getUserInfo(email: string): Observable<object> {
        return this.http.get(`${this.apiUrl}/user/profile/${email}`);
    }

    getAdmins(): Observable<UserData[]> {
        return this.http.get<UserData[]>(`${this.apiUrl}/user/admins`);
    }

    getManagers(): Observable<ManagerData[]> {
        return this.http.get<ManagerData[]>(`${this.apiUrl}/user/managers`);
    }

    getClientsInfo(): Observable<ClientData[]> {
        return this.http.get<ClientData[]>(`${this.apiUrl}/user/get-client-info`);
    }

    updateUser(user): void {  // added
        this.dialogData = user;
        const id = user.id;
        const manager = { email: user.email, password: user.password };

        this.http.post(`${this.apiUrl}/user/update`, { id, manager }).subscribe((data) => {
            this.dialogData = data;
            this.toastService.success('', 'Successfully edited!', { timeOut: 2000 });
        },
            (err: HttpErrorResponse) => {
                this.toastService.error('', 'Error occurred!', { timeOut: 5000 });
            });
    }

    addUser(user: UserRegisterData):  Observable<UserData> {
        return this.http.post<UserData>(`${this.apiUrl}/register/user`, user);
    }

    addClient(client: ClientRegisterData): Observable<ClientData> {
        return this.http.post<ClientData>(`${this.apiUrl}/register/client`, client);
    }

    updateClient(client): void {
        const managerEmail = client.newManagerEmail;
        const clientEmail = client.email;

        this.http.post(`${this.apiUrl}/user/assign-to-manager`, { managerEmail, clientEmail }).subscribe((data) => {
            this.dialogData = data;
            this.toastService.success('', 'Successfully edited!', { timeOut: 2000 });
        },
            (err: HttpErrorResponse) => {
                this.toastService.error('', 'Error occurred!', { timeOut: 5000 });
            });
    }

    getDialogData() {
        return this.dialogData;
    }
    get data(): UserData[] { // added
        return this.dataChange.value;
    }

}
