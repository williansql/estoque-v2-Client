export interface ItensResponseDto {
    id?: number;
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
