import { AuthService } from '@/core/auth/auth.service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormControlComponent, ZardFormFieldComponent, ZardFormLabelComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { ModalService } from '@/shared/components/modal';
import { MODAL_DATA } from '@/shared/components/modal/modal.tokens';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FornecedorService } from '../../fornecedor.service';
import { FornecedorDTO } from '../../dto/fornecedor.dto';
import { toast } from 'ngx-sonner';
import { ZardSelectComponent, ZardSelectImports } from '@/shared/components/select';

@Component({
  selector: 'app-cadastro-fornecedor',
  standalone: true,
  imports: [
    CommonModule,
    ZardInputDirective,
    ZardCardComponent,
    ZardButtonComponent,
    ReactiveFormsModule,
    ZardFormFieldComponent,
    ZardFormLabelComponent,
    ZardFormControlComponent,
    ZardSelectComponent,
    ZardSelectImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cadastro-fornecedor.html',
})
export class CadastroFornecedorComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(ModalService);
  private readonly fornecedorService = inject(FornecedorService);
  private readonly authService = inject(AuthService);

  public readonly data = inject<FornecedorDTO | null>(MODAL_DATA);

  fornecedorForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    fantasyName: [''],
    identity: ['', [Validators.required]],
    type: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone: [''],
    zipCode: ['', [Validators.maxLength(9)]],
    publicPlace: [''],
    number: [''],
    district: [''],
    state: [''],
    city: [''],
    country: ['Brasil'],
    municipalRegistration: [''],
    stateRegistration: [''],
    organogramId: [null as number | null],
    status: [true]
  });

  ngOnInit() {
    if (this.data) {
      this.fornecedorForm.patchValue(this.data as any);
    }

    // Lógica para integração com ViaCEP
    this.fornecedorForm.get('zipCode')?.valueChanges.subscribe(value => {
      const cleanCep = value?.replace(/\D/g, '') || '';
      if (cleanCep.length === 8) {
        this.buscarCep(cleanCep);
      } else {
        // Limpar campos se o CEP estiver incompleto ou apagado
        this.fornecedorForm.patchValue({
          publicPlace: '',
          district: '',
          city: '',
          state: ''
        }, { emitEvent: false });
      }
    });
  }

  buscarCep(cep: string) {
    this.fornecedorService.buscarCep(cep).subscribe({
      next: (res) => {
        if (!res.erro) {
          this.fornecedorForm.patchValue({
            publicPlace: res.logradouro,
            district: res.bairro,
            city: res.localidade,
            state: res.uf
          });
        } else {
          toast.error('CEP não encontrado');
        }
      },
      error: () => toast.error('Erro ao buscar o CEP')
    });
  }

  isFieldInvalid(field: string) {
    const control = this.fornecedorForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  onSubmit() {
    if (this.fornecedorForm.invalid) {
      this.fornecedorForm.markAllAsTouched();
      return;
    }

    const token: any = this.authService.decodeToken();
    const organogramId = token?.organogramId;

    const formValue = this.fornecedorForm.value;
    const dto: FornecedorDTO = {
      ...formValue,
      organogramId: formValue.organogramId || organogramId,
    } as FornecedorDTO;

    if (this.data?.id) {
      // Update
      this.fornecedorService.atualizarFornecedor(this.data.id, dto).subscribe({
        next: () => {
          toast.success(`Fornecedor ${dto.name} atualizado com sucesso!`);
          this.fornecedorService.refresh();
          this.modalService.close();
        },
        error: (err) => toast.error(`Erro ao atualizar fornecedor: ${err.error.message}`)
      });
    } else {
      // Create
      this.fornecedorService.criarFornecedor(dto).subscribe({
        next: () => {
          toast.success(`Fornecedor ${dto.name} criado com sucesso!`);
          this.fornecedorService.refresh();
          this.modalService.close();
        },
        error: (err) => {
          toast.error(`Erro ao criar fornecedor: ${err.error.message}`);
        },
      });
    }
  }

  onClose() {
    this.modalService.close();
  }
}
