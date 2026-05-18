import { AuthService } from '@/core/auth/auth.service';
import { ZardAvatarComponent } from '@/shared/components/avatar';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ModalService } from '@/shared/components/modal';
import { ZardPaginationComponent } from '@/shared/components/pagination';
import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetTipoItemDto } from '../../dto/tipo-item.dto';
import { TipoItemService } from '../../tipo-item.service';
import { ExcluirTipoItemComponent } from '../../modal/excluir-tipo-item/excluir-tipo-item.component';
import { CadastroTipoItemComponent } from '../../modal/cadastro-tipo-item/cadastro-tipo-item.component';

@Component({
  selector: 'app-lista-tipo-item',
  standalone: true,
  imports: [CommonModule, ZardButtonComponent, ZardCardComponent, ZardPaginationComponent, ZardAvatarComponent, FormsModule],
  templateUrl: './lista-tipo-item.html'
})
export class ListaTipoItemComponent implements OnInit {
  private readonly modalService = inject(ModalService);
  private readonly tipoItemService = inject(TipoItemService);
  private readonly authService = inject(AuthService);

  // Paginação
  listTipoItens = signal<GetTipoItemDto[]>([]);
  pageIndex = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = signal<number>(1);
  totalElements = signal<number>(0);

  constructor() {
    effect(() => {
      // Monitora mudanças na paginação ou sinal de refresh do serviço
      this.tipoItemService.refreshSignal();
      this.pageIndex();
      this.pageSize();

      // Executa a busca sem criar dependência circular
      untracked(() => this.getAllTipoItens());
    });
  }

  ngOnInit(): void { }

  getAllTipoItens() {
    const token: any = this.authService.decodeToken();
    const organogramId = token?.organogramId;

    const params = {
      page: this.pageIndex() - 1, // o padrão é 0 por isso o -1
      size: this.pageSize(),
      organogramId
    };

    this.tipoItemService.findAllTipoItens(params).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.listTipoItens.set(response.data.content);
          this.totalPages.set(response.data.pagination.numberOfPages);
          this.totalElements.set(response.data.pagination.totalNumberOfElements);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar tipos de item:', err);
      },
    });
  }

  openModal(tipoItem?: GetTipoItemDto) {
    this.modalService.open(CadastroTipoItemComponent, {
      width: 'min(95vw, 550px)',
      disableClose: true,
      data: tipoItem,
    });
  }

  deleteTipoItem(tipoItem: GetTipoItemDto) {
    this.modalService
      .open(ExcluirTipoItemComponent, {
        width: 'min(95vw, 550px)',
        disableClose: true,
        data: tipoItem,
      })
      .subscribe(() => console.log('Tipo de item excluído: ', tipoItem));
  }

  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
}
