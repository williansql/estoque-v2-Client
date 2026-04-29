import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardFormFieldComponent } from "@/shared/components/form";
import { ZardInputDirective } from "@/shared/components/input";
import { ModalService } from "@/shared/components/modal";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { getErrorMessage } from "../../validations/validation-categoria";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-cadastro-categoria',
    standalone: true,
    imports: [
        CommonModule,
        ZardInputDirective,
        ZardCardComponent,
        ZardButtonComponent,
        ReactiveFormsModule,
        ZardFormFieldComponent
    ],
    templateUrl: './cadastro-categoria.html',
})
export class CadastroCategoriaComponent {
    private readonly fb = inject(FormBuilder);
    private readonly modalService = inject(ModalService);

    validField = (field: string) => getErrorMessage(this.categoriaForm, field);

    categoriaForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });

    isFieldInvalid(field: string) {
        const fieldError = this.categoriaForm.get(field)?.errors;
        return fieldError;
    }

    onSubmit() {
        if (this.categoriaForm.valid) {
            console.log(this.categoriaForm.value);
        }
    }

    onClose() {
        this.modalService.close();
    }
}