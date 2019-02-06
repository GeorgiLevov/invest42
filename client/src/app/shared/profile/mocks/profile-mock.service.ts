import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators/delay';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProfileServiceMock {

    constructor() { }

    public getManagerProfile(email: string): Observable<Object> {

        const mockProfile = {
            fullname: 'Mock User',
            managerProfile: 'MANAGER',
            avatar: 'images\default.png'
        };

        const mockData = new Observable(observer => {

            observer.next(mockProfile);
            observer.complete();
        });


        return mockData;
    }
}
