import { Route } from '@angular/router';
import { ListaItensComponent } from './page/lista-itens/lista-itens.component';

export const ITENS_ROUTES: Route[] = [
  {
    path: '',
    component: ListaItensComponent,
  },
];
