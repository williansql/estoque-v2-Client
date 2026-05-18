import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable, of, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponse } from "@/shared/models/api-response";
import { CreateTipoItemDto, findAllTipoItemDto, GetTipoItemDto, UpdateTipoItemDto } from "./dto/tipo-item.dto";

@Injectable({
    providedIn: 'root'
})
export class TipoItemService {

    private readonly API = environment.api + '/type_items';
    private readonly http = inject(HttpClient);

    // Global state for categories
    private readonly _tipoItens = signal<GetTipoItemDto[]>([]);
    readonly tipoItens = this._tipoItens.asReadonly();

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

    findAllTipoItens(data: any): Observable<findAllTipoItemDto> {
        return this.http.get<findAllTipoItemDto>(this.endpoints.listar, { params: data })
            .pipe(
                switchMap((response: any) => {
                    this._tipoItens.set(response.data.content);
                    console.log(response.data.content);

                    return of(response);
                })
            );
    }

    criarTipoItem(data: CreateTipoItemDto): Observable<ApiResponse<GetTipoItemDto>> {
        return this.http.post<ApiResponse<GetTipoItemDto>>(this.endpoints.criar, data);
    }

    atualizarTipoItem(data: UpdateTipoItemDto): Observable<ApiResponse<GetTipoItemDto>> {
        return this.http.put<ApiResponse<GetTipoItemDto>>(this.endpoints.atualizar(data.id), data);
    }

    deletarTipoItem(id: number): Observable<ApiResponse<GetTipoItemDto>> {
        return this.http.delete<ApiResponse<GetTipoItemDto>>(this.endpoints.deletar(id));
    }

}