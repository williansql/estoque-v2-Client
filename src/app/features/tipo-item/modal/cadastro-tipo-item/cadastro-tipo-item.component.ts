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
import { toast } from 'ngx-sonner';
import { getErrorMessage } from '../../../../shared/utils/validations/validation-categoria';
import { TipoItemService } from '../../tipo-item.service';
import { CreateTipoItemDto, GetTipoItemDto, UpdateTipoItemDto } from '../../dto/tipo-item.dto';

@Component({
  selector: 'app-cadastro-tipo-item',
  standalone: true,
  imports: [
    CommonModule,
    ZardInputDirective,
    ZardCardComponent,
    ZardButtonComponent,
    ReactiveFormsModule,
    ZardFormFieldComponent,
  ],
  templateUrl: './cadastro-tipo-item.html',
})
export class CadastroTipoItemComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(ModalService);
  private readonly tipoItemService = inject(TipoItemService);

  public readonly data = inject<GetTipoItemDto | null>(MODAL_DATA);

  tipoItemForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
  });

  ngOnInit() {
    if (this.data) {
      this.tipoItemForm.patchValue({
        name: this.data.name,
      });
    }
  }

  validField = (field: string) => getErrorMessage(this.tipoItemForm, field);

  isFieldInvalid(field: string) {
    const control = this.tipoItemForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  onSubmit() {
    if (this.tipoItemForm.invalid) {
      this.tipoItemForm.markAllAsTouched();
      return;
    }

    if (this.data) {
      // Update
      const dto: UpdateTipoItemDto = {
        id: Number(this.data.id),
        name: this.tipoItemForm.get('name')?.value ?? '',
      };
      this.tipoItemService.atualizarTipoItem(dto).subscribe({
        next: () => {
          toast.success(`Tipo de item ${dto.name} atualizado com sucesso!`);
          this.tipoItemService.refresh();
          this.modalService.close();
        },
        error: (err) => toast.error(`Erro ao atualizar tipo de item: ${err.error.message}`)
      });
    } else {
      // Create
      const dto: CreateTipoItemDto = {
        name: this.tipoItemForm.get('name')?.value ?? '',
      };
      this.tipoItemService.criarTipoItem(dto).subscribe({
        next: () => {
          toast.success(`Tipo de item ${dto.name} criado com sucesso!`);
          this.tipoItemService.refresh();
          this.modalService.close();
        },
        error: (err) => {
          toast.error(`Erro ao criar tipo de item: ${err.error.message}`);
        },
      });
    }
  }


  onClose() {
    this.modalService.close();
  }
}
