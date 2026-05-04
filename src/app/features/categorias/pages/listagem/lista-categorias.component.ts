import { AuthService } from '@/core/auth/auth.service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ModalService } from '@/shared/components/modal';
import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CategoriaService } from '../../categoria.service';
import { GetCategoriaDto } from '../../dto/categoria.dto';
import { CadastroCategoriaComponent } from '../../modal/cadastro-categoria/cadastro-categoria.component';
import { ExcluirCategoria } from '../../modal/excluir-categoria/excluir-categoria';
import { ZardPaginationComponent } from '@/shared/components/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [CommonModule, ZardButtonComponent, ZardCardComponent, ZardPaginationComponent, FormsModule],
  templateUrl: './lista-categorias.html',
})
export class ListaCategoriasComponent implements OnInit {
  private readonly modalService = inject(ModalService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly authService = inject(AuthService);

  // Paginação
  listCategorias = signal<GetCategoriaDto[]>([]);
  pageIndex = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = signal<number>(1);
  totalElements = signal<number>(0);

  ngOnInit(): void {
    this.getAllCategorias();
  }

  getAllCategorias() {
    const token: any = this.authService.decodeToken();
    const organogramId = token?.organogramId;

    const params = {
      page: this.pageIndex() - 1, // o padrão é 0 por isso o -1
      size: this.pageSize(),
      organogramId
    };

    this.categoriaService.findAllCategorias(params).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.listCategorias.set(response.data.content);
          this.totalPages.set(response.data.pagination.numberOfPages);
          this.totalElements.set(response.data.pagination.totalNumberOfElements);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar categorias:', err);
      },
    });
  }

  openModal(categoria?: GetCategoriaDto) {
    this.modalService.open(CadastroCategoriaComponent, {
      width: 'min(95vw, 550px)',
      disableClose: true,
      data: categoria,
    });
  }

  deleteCategoria(categoria: GetCategoriaDto) {
    this.modalService
      .open(ExcluirCategoria, {
        width: 'min(95vw, 550px)',
        disableClose: true,
        data: categoria,
      })
      .subscribe(() => console.log('Categoria excluída: ', categoria));
  }
}
