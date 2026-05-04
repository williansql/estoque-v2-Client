import { Routes } from "@angular/router";
import { ListaCategoriasComponent } from "./pages/listagem/lista-categorias.component";

export const CATEGORIA_ROUTES: Routes = [
    {
        path: '',
        component: ListaCategoriasComponent,
    },
];
