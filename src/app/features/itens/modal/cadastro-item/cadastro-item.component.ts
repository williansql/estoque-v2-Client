import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardFormFieldComponent, ZardFormLabelComponent } from "@/shared/components/form";
import { ZardInputDirective } from "@/shared/components/input";
import { ModalService } from "@/shared/components/modal";
import { ZardSelectImports } from "@/shared/components/select";
import { Component, inject, ElementRef } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ItensService } from "../../itens.service";
import { toast } from "ngx-sonner";


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
export class CadastroItensComponent {

    private readonly itensService = inject(ItensService);
    private readonly modalService = inject(ModalService);
    private readonly fb = inject(FormBuilder);
    private readonly el = inject(ElementRef);

    itemForm = this.fb.group({
        codItem: ['', Validators.required],
        barcode: [''],
        name: ['', Validators.required],
        model: [''],
        branding: [''],
        description: ['', [Validators.required, Validators.maxLength(200)]],
        observations: [''],
        buyPrice: [null],
        sellPrice: [null],
        unitMeasureEnum: ['', Validators.required],
        unitMeasureQtd: [null, [Validators.required, Validators.min(1)]],
        minQuantity: [0, [Validators.required, Validators.min(1)]],
        category: ['', Validators.required],
        typeItem: ['', Validators.required],
        perecivel: [false, Validators.required],
        catmat: ['', Validators.required],
        catalogItemId: [null],
        organogram: [null]
    });

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
        this.modalService.close();
    }

    private scrollToFirstInvalidControl() {
        const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
            '.ng-invalid:not(form)'
        );

        if (firstInvalidControl) {
            firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });

            if (firstInvalidControl.tagName === 'INPUT' || firstInvalidControl.tagName === 'SELECT' || firstInvalidControl.tagName === 'TEXTAREA') {
                firstInvalidControl.focus();
            }
        }
    }


}