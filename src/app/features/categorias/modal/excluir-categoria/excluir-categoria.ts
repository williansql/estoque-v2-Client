import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormFieldComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { ModalService } from '@/shared/components/modal';
import { MODAL_DATA } from '@/shared/components/modal/modal.tokens';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GetCategoriaDto } from '../../dto/categoria.dto';
import { CategoriaService } from '../../categoria.service';

@Component({
  selector: 'app-excluir-categoria',
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardCardComponent,
    ZardFormFieldComponent,
    ZardInputDirective,
  ],
  templateUrl: './excluir-categoria.html',
})
export class ExcluirCategoria {
  private readonly modalService = inject(ModalService);
  private readonly categoriaService = inject(CategoriaService);
  readonly categoria = inject<GetCategoriaDto>(MODAL_DATA);

  excluir(id: any) {
    this.categoriaService.deletarCategoria(id).subscribe({
      next: () => {
        this.categoriaService.refresh();
        this.onClose();
      },
    });
  }

  onClose() {
    this.modalService.close();
  }
}
