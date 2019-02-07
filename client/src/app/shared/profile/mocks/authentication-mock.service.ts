import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationServiceMock {

    constructor() { }

    tokenEmail(): string {

        return 'mock_email@gmail.com';
    }

    public logout(): void { }

}
