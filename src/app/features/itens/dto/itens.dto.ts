import { PageContent } from "@/shared/models/api-response";

export interface GetItemDto {
  id: number;
  codItem: string;
  barcode: string;
  name: string;
  model?: string;
  branding?: string;
  description?: string;
  observations?: string;
  buyPrice?: number;
  sellPrice?: number;
  unitMeasureEnum?: string;
  unitMeasureQtd?: number;
  status?: boolean;
  minQuantity: number;
  quantity?: number;
  category: string;
  typeItem: string;
  perecivel: boolean;
  catmat: string;
  catalogItemId?: number;
  organogram?: number;
}

export type findAllItensDto = PageContent<GetItemDto>;

export interface CreateItemDto {
  codItem: string;
  barcode: string;
  name: string;
  model?: string;
  branding?: string;
  description?: string;
  observations?: string;
  buyPrice?: number;
  sellPrice?: number;
  unitMeasureEnum?: string;
  unitMeasureQtd?: number;
  minQuantity: number;
  category: string;
  typeItem: string;
  perecivel: boolean;
  catmat: string;
  catalogItemId?: number;
  organogram?: number;
}

export interface UpdateItemDto extends Partial<CreateItemDto> {
  id: number;
}
