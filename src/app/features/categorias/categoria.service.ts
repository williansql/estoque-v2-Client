import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable, of, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponse } from "@/shared/models/api-response";
import { CreateCategoriaDto, findAllCategoriasDto, GetCategoriaDto, UpdateCategoriaDto } from "./dto/categoria.dto";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    private readonly API = environment.api + '/categories';
    private readonly http = inject(HttpClient);

    // Global state for categories
    private readonly _categorias = signal<GetCategoriaDto[]>([]);
    readonly categorias = this._categorias.asReadonly();

    // Signal to trigger refresh in components
    private readonly _refreshSignal = signal<number>(0);
    readonly refreshSignal = this._refreshSignal.asReadonly();

    refresh() {
        this._refreshSignal.update(v => v + 1);
    }

    readonly endpoints = {
        id: (id: number) => `${this.API}/${id}`,
        listar: this.API,
        criar: this.API,
        atualizar: (id: number) => `${this.API}/${id}`,
        deletar: (id: number) => `${this.API}/${id}`,
    };

    findAllCategorias(data: any): Observable<findAllCategoriasDto> {
        return this.http.get<findAllCategoriasDto>(this.endpoints.listar, { params: data })
            .pipe(
                switchMap((response: any) => {
                    this._categorias.set(response.data.content);
                    console.log(response.data.content);

                    return of(response);
                })
            );
    }

    criarCategoria(data: CreateCategoriaDto): Observable<ApiResponse<GetCategoriaDto>> {
        return this.http.post<ApiResponse<GetCategoriaDto>>(this.endpoints.criar, data);
    }

    atualizarCategoria(data: UpdateCategoriaDto): Observable<ApiResponse<GetCategoriaDto>> {
        return this.http.put<ApiResponse<GetCategoriaDto>>(this.endpoints.atualizar(data.id), data);
    }

    deletarCategoria(id: number): Observable<ApiResponse<GetCategoriaDto>> {
        return this.http.delete<ApiResponse<GetCategoriaDto>>(this.endpoints.deletar(id));
    }

}