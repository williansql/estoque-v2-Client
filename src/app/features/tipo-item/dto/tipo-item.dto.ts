import { PageContent } from "@/shared/models/api-response";

export interface GetTipoItemDto {
    id?: number;
    name?: string;
}

export type findAllTipoItemDto = PageContent<GetTipoItemDto>;

export interface CreateTipoItemDto {
    name: string;
}

export interface UpdateTipoItemDto {
    id: number;
    name: string;
}

export interface DeleteTipoItemDto {
    id: number;
}