import { PageContent } from '@/shared/models/api-response';

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
  barcode: string | null;
  name: string | null;
  branding?: string | null;
  description?: string | null;
  buyPrice?: number | null;
  unitMeasureEnum?: string | null;
  unitMeasureQtd?: number | null;
  minQuantity?: number | null;
  category?: string | null;
  typeItem?: string | null;
  perecivel?: boolean | null;
  catmat?: string | null;
  observations?: string | null;
}

export interface UpdateItemDto extends Partial<CreateItemDto> {
  id: number;
}
