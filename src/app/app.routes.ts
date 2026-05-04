import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'categorias',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadChildren: () => import('./core/auth/auth.route').then((m) => m.AUTH_ROUTE),
  },
  {
    path: 'categorias',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/categorias/categoria.route').then((m) => m.CATEGORIA_ROUTES),
  },
  {
    path: 'itens',
    canActivate: [authGuard],
    loadChildren: () => import('./features/itens/itens.route').then((m) => m.ITENS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'categorias',
  },
];
