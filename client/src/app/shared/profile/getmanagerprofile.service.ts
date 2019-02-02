import { AppConfig } from './../../config/app.config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagerProfile } from '../models/users/manager.model';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProfileService {

    private managerProfile: ManagerProfile;

    constructor(private http: HttpClient, private appConfig: AppConfig) { }


    public getManagerProfile(email: string): Observable<Object> {
        const url = `${this.appConfig.apiUrl}/user/profile/${email}`;
        return this.http.get(url);
    }
}
