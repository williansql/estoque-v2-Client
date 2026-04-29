import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardInputDirective } from "@/shared/components/input";
import { Component, inject } from "@angular/core";
import { ZardInputGroupComponent } from "@/shared/components/input-group";
import { ZardCheckboxComponent } from "@/shared/components/checkbox";
import { ZardSelectComponent, ZardSelectItemComponent } from "@/shared/components/select";
import { ZardFormImports } from "@/shared/components/form";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ModalService } from "@/shared/components/modal";
import { CadastroCategoriaComponent } from "../../modal/cadastro-categoria/cadastro-categoria.component";

@Component({
    selector: 'app-categoria-listagem',
    imports: [
        CommonModule,
        ZardButtonComponent
    ],
    templateUrl: './categoria-listagem.html',
})
export class CategoriaListagemComponent {

    private readonly modalService = inject(ModalService);

    openModal() {
        this.modalService.open(CadastroCategoriaComponent, {
            width: '70%',
            disableClose: true
        });
    }

}