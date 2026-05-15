import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardFormFieldComponent } from "@/shared/components/form";
import { ModalService } from "@/shared/components/modal";
import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CategoriaModelData } from "../../model/categoria-model";

@Component({
    selector: 'app-editar-categoria',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ZardCardComponent,
        ZardFormFieldComponent,
        ZardButtonComponent
    ],
    templateUrl: './editar-categoria.html',
})
export class EditarCategoriaComponent {

    private readonly fb = inject(FormBuilder);
    private readonly modal = inject(ModalService);

    data = signal<CategoriaModelData | null>(null);
    validarCategoria = (field: string) => this.categoriaForm.get(field);

    categoriaForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });

    ngOnInit() {
        this.categoriaForm.get('name')?.setValue(this.data()?.name ?? '');
    }

    onClose() {
        this.modal.close();
    }

    onSubmit() {
        if (this.categoriaForm.invalid) {
            this.categoriaForm.markAllAsTouched();
            return;
        }
        console.log(this.categoriaForm.value);
        this.categoriaForm.reset();
        this.modal.close();
    }

}