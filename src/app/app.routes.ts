import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
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
    path: 'tipo-itens',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/tipo-item/tipo-item.route').then((m) => m.TIPOS_ITEM_ROUTES),
  },
  {
    path: 'itens',
    canActivate: [authGuard],
    loadChildren: () => import('./features/itens/itens.route').then((m) => m.ITENS_ROUTES),
  },
  {
    path: 'fornecedores',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/fornecedores/fornecedor.route').then((m) => m.FORNECEDORES_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
