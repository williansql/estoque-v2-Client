import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthLoginDto } from "./dto/auth.dto";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly API = environment.api + '/auth';
    private readonly router = inject(Router);

    // Signal to track auth state reactively
    private readonly _isLoggedIn = signal<boolean>(this.getToken() !== null);
    readonly isLoggedInSignal = this._isLoggedIn.asReadonly();

    endpoints = {
        login: `${this.API}/login`,
        register: `${this.API}/register`,
    }

    login(data: AuthLoginDto): Observable<any> {
        return this.http.post<any>(this.endpoints.login, data).pipe(
            tap(response => {
                if (response.data?.token) {
                    this.setToken(response.data.token);
                }
            })
        );
    }

    setToken(token: string): void {
        sessionStorage.setItem('token', token);
        this._isLoggedIn.set(true);
    }

    getToken(): string | null {
        return sessionStorage.getItem('token');
    }

    removeToken(): void {
        sessionStorage.removeItem('token');
        this._isLoggedIn.set(false);
    }

    decodeToken() {
        const token = this.getToken();
        if (!token) return null;
        return jwtDecode(token);
    }

    isLoggedIn(): boolean {
        return this._isLoggedIn();
    }

    logout(): void {
        this.removeToken();
        this.router.navigate(['/login']);
    }

}