import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardFormFieldComponent } from "@/shared/components/form";
import { ModalService } from "@/shared/components/modal";
import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CategoriaModelData } from "../../model/categoria-model";
import { GetTipoItemDto } from "../../dto/tipo-item.dto";

@Component({
    selector: 'app-editar-tipo-item',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ZardCardComponent,
        ZardFormFieldComponent,
        ZardButtonComponent
    ],
    templateUrl: './editar-tipo-item.html',
})
export class EditarTipoItemComponent {

    private readonly fb = inject(FormBuilder);
    private readonly modal = inject(ModalService);

    data = signal<GetTipoItemDto | null>(null);
    validarTipoItem = (field: string) => this.tipoItemForm.get(field);

    tipoItemForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });

    ngOnInit() {
        this.tipoItemForm.get('name')?.setValue(this.data()?.name ?? '');
    }

    onClose() {
        this.modal.close();
    }

    onSubmit() {
        if (this.tipoItemForm.invalid) {
            this.tipoItemForm.markAllAsTouched();
            return;
        }
        console.log(this.tipoItemForm.value);
        this.tipoItemForm.reset();
        this.modal.close();
    }

}