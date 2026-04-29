import { Routes } from '@angular/router';
import { CadastroCategoriaComponent } from './features/categorias/modal/cadastro-categoria/cadastro-categoria.component';
import { CategoriaListagemComponent } from './features/categorias/pages/listagem/categoria-listagem.component';

export const routes: Routes = [
    {
        path: '',
        component: CategoriaListagemComponent,
    },
];
