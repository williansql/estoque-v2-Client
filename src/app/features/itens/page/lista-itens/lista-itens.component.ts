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

import { ZardPaginationComponent } from '@/shared/components/pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CadastroItensComponent } from '../../modal/cadastro-item/cadastro-item.component';
import { ZardAvatarComponent } from '@/shared/components/avatar';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideBinary, lucidePackage, lucidePackage2, lucideTag } from '@ng-icons/lucide';

@Component({
  selector: 'app-lista-itens',
  imports: [ZardButtonComponent, ZardCardComponent, ZardPaginationComponent, FormsModule, CommonModule, NgIcon],
  templateUrl: './lista-itens.html',
  viewProviders: [
    provideIcons({
      lucidePackage,
      lucidePackage2,
      lucideTag,
      lucideBinary,
    })
  ]
})
export class ListaItensComponent {
  private readonly modalService = inject(ModalService);
  private readonly itensService = inject(ItensService);
  private readonly authService = inject(AuthService);

  listItens = signal<GetItemDto[]>([]);
  pageIndex = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = signal<number>(1);
  totalElements = signal<number>(0);

  // Example of a computed signal for derived data
  ngOnInit(): void {
    this.getAllItens();
  }

  getAllItens() {
    const token: any = this.authService.decodeToken();
    const organogramId = token?.organogramId;

    const params = {
      page: this.pageIndex() - 1, // API usually uses 0-based index
      size: this.pageSize(),
      organogramId
    };

    this.itensService.findAllItens(params).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.listItens.set(response.data.content);
          this.totalPages.set(response.data.pagination.numberOfPages);
          this.totalElements.set(response.data.pagination.totalNumberOfElements);
        }
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

  openModalCadastro() {
    this.modalService.open(CadastroItensComponent, {
      width: 'min(95vw, 1000px)',
      height: '70dvh',
      disableClose: true,
    });
  }
}
