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
        const token = sessionStorage.getItem('token');
        if (!token) {
            return null;
        }
        const decoded: any = this.decodeToken();
        if (!decoded?.exp) {
            this.removeToken();
            return null;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            this.removeToken();
            return null;
        }
        return token;
    }

    removeToken(): void {
        sessionStorage.removeItem('token');
        this._isLoggedIn.set(false);
    }

    decodeToken() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            return null;
        }
        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    logout(): void {
        this.removeToken();
        this.router.navigate(['/login']);
    }

}