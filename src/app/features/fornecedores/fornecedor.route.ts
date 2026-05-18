import { Routes } from '@angular/router';

export const FORNECEDORES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/listagem/lista-fornecedores.component').then((m) => m.ListaFornecedoresComponent),
  },
];
