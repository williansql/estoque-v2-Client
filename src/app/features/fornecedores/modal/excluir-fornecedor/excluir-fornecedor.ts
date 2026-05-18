import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ModalService } from '@/shared/components/modal';
import { MODAL_DATA } from '@/shared/components/modal/modal.tokens';
import { Component, inject } from '@angular/core';
import { FornecedorDTO } from '../../dto/fornecedor.dto';
import { FornecedorService } from '../../fornecedor.service';

@Component({
  selector: 'app-excluir-fornecedor',
  standalone: true,
  imports: [
    ZardButtonComponent,
    ZardCardComponent,
  ],
  templateUrl: './excluir-fornecedor.html',
})
export class ExcluirFornecedor {
  private readonly modalService = inject(ModalService);
  private readonly fornecedorService = inject(FornecedorService);
  readonly fornecedor = inject<FornecedorDTO>(MODAL_DATA);

  excluir(id: any) {
    this.fornecedorService.deletarFornecedor(id).subscribe({
      next: () => {
        this.fornecedorService.refresh();
        this.onClose();
      },
    });
  }

  onClose() {
    this.modalService.close();
  }
}
