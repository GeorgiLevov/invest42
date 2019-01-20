
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import * as decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { UserData } from '../../models/interfaces/user-data.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private apiUrl = 'http://localhost:5500';

    constructor(

        private http: HttpClient,

    ) { }

    getUserInfo(email: string): Observable<object> {
        return this.http.get(`${this.apiUrl}/user/profile/${email}`);
    }

    getAdmins(): Observable<UserData[]> {
        return this.http.get<UserData[]>(`${this.apiUrl}/user/admins`);
    }

}
