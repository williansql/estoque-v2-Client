import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormFieldComponent, ZardFormLabelComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { ModalService } from '@/shared/components/modal';
import { ZardSelectImports } from '@/shared/components/select';
import { Component, inject, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItensService } from '../../itens.service';
import { toast } from 'ngx-sonner';
import { AuthService } from '@/core/auth/auth.service';
import { CreateItemDto } from '../../dto/itens.dto';

@Component({
  selector: 'app-cadastro-itens',
  standalone: true,
  imports: [
    ZardButtonComponent,
    ZardCardComponent,
    ZardFormFieldComponent,
    ZardInputDirective,
    ReactiveFormsModule,
    ZardSelectImports,
    ZardFormLabelComponent,
  ],
  templateUrl: './cadastro-item.html',
})
export class CadastroItensComponent implements OnInit {
  private readonly itensService = inject(ItensService);
  private readonly modalService = inject(ModalService);
  private readonly authService = inject(AuthService);

  private readonly fb = inject(FormBuilder);
  private readonly el = inject(ElementRef);

  dataUser: any;

  itemForm = this.fb.group({
    barcode: [null],
    name: ['', Validators.required],
    branding: [''],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    observations: [''],
    buyPrice: [0],
    unitMeasureEnum: ['', Validators.required],
    unitMeasureQtd: [0, [Validators.required, Validators.min(1)]],
    minQuantity: [0, [Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
    typeItem: ['', Validators.required],
    perecivel: [false, Validators.required],
    catmat: [''],
  });

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.dataUser = this.authService.decodeToken();
      console.log(this.dataUser);
    }
  }

  onClose() {
    this.modalService.close();
  }

  onSubmit() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();

      setTimeout(() => {
        this.scrollToFirstInvalidControl();
      });

      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const payload: CreateItemDto = {
      ...this.itemForm.getRawValue(),
    };

    this.itensService.criarItem(payload).subscribe({
      next: () => {
        toast.success('Item cadastrado com sucesso!');
        this.modalService.close();
      },
      error: (error) => {
        toast.error('Erro ao cadastrar item!', error.error.message);
      },
    });
  }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement =
      this.el.nativeElement.querySelector('.ng-invalid:not(form)');

    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });

      if (
        firstInvalidControl.tagName === 'INPUT' ||
        firstInvalidControl.tagName === 'SELECT' ||
        firstInvalidControl.tagName === 'TEXTAREA'
      ) {
        firstInvalidControl.focus();
      }
    }
  }
}
