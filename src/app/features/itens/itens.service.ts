import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '@/shared/models/api-response';
import { CreateItemDto, findAllItensDto, GetItemDto, UpdateItemDto } from './dto/itens.dto';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  private readonly API = environment.api + '/items';
  private readonly http = inject(HttpClient);

  // Global state for items
  private readonly _itens = signal<GetItemDto[]>([]);
  readonly itens = this._itens.asReadonly();

  readonly endpoints = {
    id: (id: number) => `${this.API}/${id}`,
    listar: this.API,
    criar: this.API,
    atualizar: (id: number) => `${this.API}/${id}`,
    deletar: (id: number) => `${this.API}/${id}`,
  };

  findAllItens(data: any): Observable<ApiResponse<findAllItensDto>> {
    return this.http.get<ApiResponse<findAllItensDto>>(this.endpoints.listar, {
      params: data,
    }).pipe(
      tap(response => {
        if (response.data && response.data.content) {
          this._itens.set(response.data.content);
        }
      })
    );
  }

  criarItem(data: CreateItemDto): Observable<ApiResponse<GetItemDto>> {
    return this.http.post<ApiResponse<GetItemDto>>(this.endpoints.criar, data);
  }

  atualizarItem(data: UpdateItemDto): Observable<ApiResponse<GetItemDto>> {
    return this.http.put<ApiResponse<GetItemDto>>(this.endpoints.atualizar(data.id), data);
  }

  deletarItem(id: number): Observable<ApiResponse<GetItemDto>> {
    return this.http.delete<ApiResponse<GetItemDto>>(this.endpoints.deletar(id));
  }

}
