import { UserLogin } from '../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpOptions } from '../../models/core/http-options.model';
import * as decode from 'jwt-decode';



@Injectable()
export class LoginService {

    private readonly apiUrl = 'http://localhost:5500';

    constructor(

        private http: HttpClient
    ) { }

    public login(user: UserLogin, options?: HttpOptions): Observable<Object> {
        return this.http.post(`${this.apiUrl}/login`, user);
    }

}
