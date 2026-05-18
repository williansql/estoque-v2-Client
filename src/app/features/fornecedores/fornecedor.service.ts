import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponse } from "@/shared/models/api-response";
import { FornecedorDTO, findAllFornecedoresDto } from "./dto/fornecedor.dto";

@Injectable({
    providedIn: 'root'
})
export class FornecedorService {

    private readonly API = environment.api + '/person'; // ou persons?
    private readonly http = inject(HttpClient);

    private readonly _fornecedores = signal<FornecedorDTO[]>([]);
    readonly fornecedores = this._fornecedores.asReadonly();

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

    findAllFornecedores(data: any): Observable<findAllFornecedoresDto> {
        return this.http.get<findAllFornecedoresDto>(this.endpoints.listar, { params: data })
            .pipe(
                switchMap((response: any) => {
                    this._fornecedores.set(response.data.content);
                    return of(response);
                })
            );
    }

    criarFornecedor(data: FornecedorDTO): Observable<ApiResponse<FornecedorDTO>> {
        return this.http.post<ApiResponse<FornecedorDTO>>(this.endpoints.criar, data);
    }

    atualizarFornecedor(data: FornecedorDTO): Observable<ApiResponse<FornecedorDTO>> {
        return this.http.put<ApiResponse<FornecedorDTO>>(this.endpoints.atualizar(data.id!), data);
    }

    deletarFornecedor(id: number): Observable<ApiResponse<FornecedorDTO>> {
        return this.http.delete<ApiResponse<FornecedorDTO>>(this.endpoints.deletar(id));
    }

    buscarCep(cep: string): Observable<any> {
        const cleanCep = cep.replace(/\D/g, '');
        return this.http.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
    }
}
