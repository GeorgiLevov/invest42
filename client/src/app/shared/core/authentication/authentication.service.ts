import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import * as decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        // private jwtService: JwtHelperService,
        private toastr: ToastrService,
    ) { }

    // public isAuthenticated(): boolean {
    //     const token = localStorage.getItem('token');

    //     return !this.jwtService.isTokenExpired(token);
    // }

    public getRole(): string {
        const token = localStorage.getItem('token');
        const role = decode(token).role;

        return role;
    }

    tokenData(): { id: number, role: string } {
        const token = localStorage.getItem('token');

        const tokenPayload = jwt_decode(token);

        return tokenPayload;
    }

    public logout(): void {
        this.toastr.success(`You are logged out!`);
        localStorage.removeItem('token');
        localStorage.clear();
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

}