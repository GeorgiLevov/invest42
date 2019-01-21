
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import * as decode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserData } from '../../models/interfaces/user-data.model';

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

    updateUser(user): void {  // added
        this.dialogData = user;
        const id = user.id;
        const manager = { email: user.email, password: user.password };

        this.http.post(`${this.apiUrl}/user/update`, { id, manager }).subscribe((data) => {
            this.dialogData = data;
            this.toastService.success('', 'Successfully edited!', { timeOut: 2000 });
        },
            (err: HttpErrorResponse) => {
                this.toastService.error('', 'Error occurred', { timeOut: 5000 });
            });
    }

    addUser(user: UserData): void { // added
        this.dialogData = user;
    }

    getDialogData() {
        return this.dialogData;
    }

    get data(): UserData[] { // added
        return this.dataChange.value;
    }

}
