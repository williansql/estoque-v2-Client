import { AuthService } from '@/core/auth/auth.service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ModalService } from '@/shared/components/modal';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, effect, untracked, inject } from '@angular/core';
import { ZardPaginationComponent } from '@/shared/components/pagination';
import { FormsModule } from '@angular/forms';
import { ZardAvatarComponent } from '@/shared/components/avatar';

import { FornecedorService } from '../../fornecedor.service';
import { FornecedorDTO } from '../../dto/fornecedor.dto';
import { CadastroFornecedorComponent } from '../../modal/cadastro-fornecedor/cadastro-fornecedor.component';
import { ExcluirFornecedor } from '../../modal/excluir-fornecedor/excluir-fornecedor';

@Component({
  selector: 'app-lista-fornecedores',
  standalone: true,
  imports: [CommonModule, ZardButtonComponent, ZardCardComponent, ZardPaginationComponent, ZardAvatarComponent, FormsModule],
  templateUrl: './lista-fornecedores.html',
})
export class ListaFornecedoresComponent implements OnInit {
  private readonly modalService = inject(ModalService);
  private readonly fornecedorService = inject(FornecedorService);
  private readonly authService = inject(AuthService);

  // Paginação
  listFornecedores = signal<FornecedorDTO[]>([]);
  pageIndex = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = signal<number>(1);
  totalElements = signal<number>(0);

  constructor() {
    effect(() => {
      this.fornecedorService.refreshSignal();
      this.pageIndex();
      this.pageSize();

      untracked(() => this.getAllFornecedores());
    });
  }

  ngOnInit(): void { }

  getAllFornecedores() {
    const token: any = this.authService.decodeToken();
    const organogramId = token?.organogramId;

    const params = {
      page: this.pageIndex() - 1,
      size: this.pageSize(),
      organogramId
    };

    this.fornecedorService.findAllFornecedores(params).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.listFornecedores.set(response.data.content);
          this.totalPages.set(response.data.pagination.numberOfPages);
          this.totalElements.set(response.data.pagination.totalNumberOfElements);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar fornecedores:', err);
      },
    });
  }

  openModal(fornecedor?: FornecedorDTO) {
    this.modalService.open(CadastroFornecedorComponent, {
      width: 'min(95vw, 650px)',
      disableClose: true,
      data: fornecedor,
    });
  }

  deleteFornecedor(fornecedor: FornecedorDTO) {
    this.modalService
      .open(ExcluirFornecedor, {
        width: 'min(95vw, 550px)',
        disableClose: true,
        data: fornecedor,
      })
      .subscribe(() => console.log('Fornecedor excluído: ', fornecedor));
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
