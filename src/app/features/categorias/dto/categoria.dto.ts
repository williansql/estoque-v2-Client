import { PageContent } from "@/shared/models/api-response";

export interface GetCategoriaDto {
    id?: number;
    name?: string;
}

export type findAllCategoriasDto = PageContent<GetCategoriaDto>;

export interface CreateCategoriaDto {
    name: string;
}

export interface UpdateCategoriaDto {
    id: number;
    name: string;
}

export interface DeleteCategoriaDto {
    id: number;
}