import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import * as decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private toastr: ToastrService,
        private router: Router,
    ) { }

    public getRole(): string {
        const token = localStorage.getItem('token');
        const role = decode(token).role;

        return role;
    }

    public getEmail(): string {
        const token = localStorage.getItem('token');
        const email = decode(token).email;

        return email;
    }

    tokenData(): { id: number, role: string } {
        const token = localStorage.getItem('token');
        const tokenPayload = jwt_decode(token);

        return tokenPayload;
    }

    tokenEmail(): string {
        const token = localStorage.getItem('token');
        const tokenPayload = jwt_decode(token);

        return tokenPayload.email;
    }

    public logout(): void {
        this.toastr.success(`You are logged out!`);
        this.router.navigate(['']);
        localStorage.removeItem('token');
        localStorage.clear();
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

}
