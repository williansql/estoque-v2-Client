import { Routes } from "@angular/router";

export const AUTH_ROUTE: Routes = [
    {
        path: '',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
]