export class AppConfig {
    readonly apiUrl: string;
    readonly jwt_issuer: string;

    constructor() {
        this.apiUrl = 'http://localhost:5500';
        this.jwt_issuer = 'root';
    }
}
