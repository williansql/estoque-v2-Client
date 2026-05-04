import { AuthService } from '@/core/auth/auth.service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormFieldComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { ModalService } from '@/shared/components/modal';
import { MODAL_DATA } from '@/shared/components/modal/modal.tokens';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { getErrorMessage } from '../../../../shared/utils/validations/validation-categoria';
import { CategoriaService } from '../../categoria.service';
import { CreateCategoriaDto, GetCategoriaDto, UpdateCategoriaDto } from '../../dto/categoria.dto';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-cadastro-categoria',
  standalone: true,
  imports: [
    CommonModule,
    ZardInputDirective,
    ZardCardComponent,
    ZardButtonComponent,
    ReactiveFormsModule,
    ZardFormFieldComponent,
  ],
  templateUrl: './cadastro-categoria.html',
})
export class CadastroCategoriaComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(ModalService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly authService = inject(AuthService);

  public readonly data = inject<GetCategoriaDto | null>(MODAL_DATA);

  categoriaForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
  });

  ngOnInit() {
    if (this.data) {
      this.categoriaForm.patchValue({
        name: this.data.name,
      });
    }
  }

  validField = (field: string) => getErrorMessage(this.categoriaForm, field);

  isFieldInvalid(field: string) {
    const control = this.categoriaForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  onSubmit() {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }

    const token: any = this.authService.decodeToken();
    const organogramId = token?.organogramId;

    if (this.data) {
      // Update
      const dto: UpdateCategoriaDto = {
        id: this.data.id,
        name: this.categoriaForm.get('name')?.value ?? '',
      };
      this.categoriaService.atualizarCategoria(dto).subscribe({
        next: () => {
          this.refreshAndClose(organogramId);
        },
        error: (err) => console.error('Erro ao atualizar categoria:', err),
      });
    } else {
      // Create
      const dto: CreateCategoriaDto = {
        name: this.categoriaForm.get('name')?.value ?? '',
      };
      this.categoriaService.criarCategoria(dto).subscribe({
        next: () => {
          this.refreshAndClose(organogramId);
          toast.success(`Categoria ${dto.name} criada com sucesso!`);
        },
        error: (err) => {
          this.refreshAndClose(organogramId);
          toast.error(`Erro ao criar categoria: ${err.error.message}`);
        },
      });
    }
  }

  private refreshAndClose(organogramId: any) {
    // Refresh the global state in the service
    this.categoriaService.findAllCategorias({ organogramId }).subscribe();
    this.onClose();
  }

  onClose() {
    this.modalService.close();
  }
}
