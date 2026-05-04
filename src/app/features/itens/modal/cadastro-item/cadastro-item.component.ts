import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardFormFieldComponent, ZardFormLabelComponent } from "@/shared/components/form";
import { ZardInputDirective } from "@/shared/components/input";
import { ModalService } from "@/shared/components/modal";
import { ZardSelectImports } from "@/shared/components/select";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ItensService } from "../../itens.service";

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
        ZardFormLabelComponent
    ],
    templateUrl: './cadastro-item.html',
})
export class CadastroItensComponent {

    private readonly itensService = inject(ItensService);
    private readonly modalService = inject(ModalService);
    private readonly fb = inject(FormBuilder);

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
        unitMeasureEnum: [''],
        unitMeasureQtd: [null],
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
        this.modalService.close();
    }


}