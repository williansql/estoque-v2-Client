import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormFieldComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { ModalService } from '@/shared/components/modal';
import { MODAL_DATA } from '@/shared/components/modal/modal.tokens';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoItemService } from '../../tipo-item.service';
import { GetTipoItemDto } from '../../dto/tipo-item.dto';

@Component({
  selector: 'app-excluir-tipo-item',
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardCardComponent,
    ZardFormFieldComponent,
    ZardInputDirective,
  ],
  templateUrl: './excluir-tipo-item.html',
})
export class ExcluirTipoItemComponent {
  private readonly modalService = inject(ModalService);
  private readonly tipoItemService = inject(TipoItemService);
  readonly tipoItem = inject<GetTipoItemDto>(MODAL_DATA);

  excluirTipoItem(id: any) {
    this.tipoItemService.deletarTipoItem(id).subscribe({
      next: () => {
        this.tipoItemService.refresh();
        this.onClose();
      },
    });
  }

  onClose() {
    this.modalService.close();
  }
}
