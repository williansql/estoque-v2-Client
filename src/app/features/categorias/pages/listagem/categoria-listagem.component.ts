import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ModalService } from "@/shared/components/modal";
import { CommonModule } from "@angular/common";
import { Component, inject, signal, OnInit, computed } from "@angular/core";
import { CategoriaService } from "../../categoria.service";
import { GetCategoriaDto } from "../../dto/categoria.dto";
import { CadastroCategoriaComponent } from "../../modal/cadastro-categoria/cadastro-categoria.component";
import { AuthService } from "@/core/auth/auth.service";

@Component({
    selector: 'app-categoria-listagem',
    standalone: true,
    imports: [CommonModule, ZardButtonComponent, ZardCardComponent],
    templateUrl: './categoria-listagem.html',
})
export class CategoriaListagemComponent implements OnInit {
    private readonly modalService = inject(ModalService);
    private readonly categoriaService = inject(CategoriaService);
    private readonly authService = inject(AuthService);

    // Using the global state from the service
    categorias = this.categoriaService.categorias;

    // Example of a computed signal for derived data
    totalCategorias = computed(() => this.categorias().length);

    ngOnInit(): void {
        this.getAllCategorias();
    }

    getAllCategorias(params?: any) {
        const token: any = this.authService.decodeToken();
        const organogramId = token?.organogramId;
        
        // Correctly passing the organogramId as a parameter
        this.categoriaService.findAllCategorias({ ...params, organogramId }).subscribe({
            next: (response) => {
                console.log('Categorias carregadas:', response.data.content);
            },
            error: (err) => {
                console.error('Erro ao buscar categorias:', err);
            }
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
        if (confirm(`Deseja realmente excluir a categoria "${categoria.name}"?`)) {
            this.categoriaService.deletarCategoria(categoria.id).subscribe({
                next: () => {
                    this.getAllCategorias(); // Refresh the list
                },
                error: (err) => {
                    console.error('Erro ao excluir categoria:', err);
                }
            });
        }
    }
}