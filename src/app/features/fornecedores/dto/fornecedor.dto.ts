
import { PageContent } from '@/shared/models/api-response';

export interface FornecedorDTO {
    id?: number;
    name: string;
    surname?: string;
    fantasyName?: string;
    identity?: string; // CPF or CNPJ
    phone?: string;
    email?: string;
    municipalRegistration?: string;
    stateRegistration?: string;
    organogramId?: number;
    type: string; // F for Fisica, J for Juridica probably?
    status?: boolean;
    publicPlace?: string;
    number?: string;
    district?: string;
    state?: string;
    city?: string;
    country?: string;
    zipCode?: string;
}

export type findAllFornecedoresDto = PageContent<FornecedorDTO>;
