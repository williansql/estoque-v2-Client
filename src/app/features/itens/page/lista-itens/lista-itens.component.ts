import { ModalService } from '@/shared/components/modal';
import { Component, computed, inject, signal } from '@angular/core';
import { ItensService } from '../../itens.service';
import { AuthService } from '@/core/auth/auth.service';
import { GetItemDto } from '../../dto/itens.dto';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { EditarItemComponent } from '../../modal/editar-item/editar-item.component';
import { ExcluirItensComponent } from '../../modal/excluir-item/excluir-item.component';
import { DetalhesItensComponent } from '../../modal/detalhes-itens/detalhes-item.component';

@Component({
  selector: 'app-lista-itens',
  imports: [ZardButtonComponent, ZardCardComponent],
  templateUrl: './lista-itens.html',
})
export class ListaItensComponent {
  private readonly modalService = inject(ModalService);
  private readonly itensService = inject(ItensService);
  private readonly authService = inject(AuthService);

  listItens = signal<GetItemDto[]>([]);

  // Example of a computed signal for derived data
  ngOnInit(): void {
    this.getAllItens();
  }

  getAllItens(params?: any) {
    const token: any = this.authService.decodeToken();
    const organogramId = token?.organogramId;

    // Correctly passing the organogramId as a parameter
    this.itensService.findAllItens({ ...params, organogramId }).subscribe({
      next: (response: any) => {
        this.listItens.set(response.data.content);
      },
      error: (err: any) => {
        console.error('Erro ao buscar itens:', err);
      },
    });
  }

  verItem(itens?: GetItemDto) {
    this.modalService.open(DetalhesItensComponent, {
      width: 'min(95vw, 550px)',
      disableClose: true,
      data: itens,
    });
  }

  openModal(itens?: GetItemDto) {
    this.modalService.open(EditarItemComponent, {
      width: 'min(95vw, 550px)',
      disableClose: true,
      data: itens,
    });
  }

  deleteItens(itens: GetItemDto) {
    this.modalService
      .open(ExcluirItensComponent, {
        width: 'min(95vw, 550px)',
        disableClose: true,
        data: itens,
      })
      .subscribe(() => console.log('Itens excluído: ', itens));
  }
}
