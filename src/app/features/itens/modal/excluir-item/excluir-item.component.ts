import { Component, inject } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormFieldComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MODAL_DATA, ModalService } from '@/shared/components/modal';
import { ItensService } from '../../itens.service';
import { GetItemDto } from '../../dto/itens.dto';

@Component({
  selector: 'app-excluir-itens',
  standalone: true,
  imports: [
    ZardButtonComponent,
    ZardCardComponent,
    ZardFormFieldComponent,
    ZardInputDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './excluir-item.html',
})
export class ExcluirItensComponent {
  private readonly modalService = inject(ModalService);
  private readonly itensService = inject(ItensService);
  readonly item = inject<GetItemDto>(MODAL_DATA);

  excluir(id: any) {
    this.itensService.deletarItem(id).subscribe({
      next: () => {
        this.itensService.findAllItens({ page: 1, limit: 10 });
        this.onClose();
      },
    });
  }

  onClose() {
    this.modalService.close();
  }
}
