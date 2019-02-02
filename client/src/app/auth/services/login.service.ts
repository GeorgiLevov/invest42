import { AppConfig } from './../../config/app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpOptions } from '../../shared/models/core/http-options.model';
import { UserLogin } from '../../shared/models/user-login.model';

@Injectable()
export class LoginService {


    constructor(
        private appConfig: AppConfig,
        private http: HttpClient
    ) { }

    public login(user: UserLogin, options?: HttpOptions): Observable<Object> {
        return this.http.post(`${this.appConfig.apiUrl}/login`, user);
    }

}
