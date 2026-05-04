import { Component } from "@angular/core";
import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardFormFieldComponent } from "@/shared/components/form";
import { ZardInputDirective } from "@/shared/components/input";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-cadastro-itens',
    standalone: true,
    imports: [
        ZardButtonComponent,
        ZardCardComponent,
        ZardFormFieldComponent,
        ZardInputDirective,
        ReactiveFormsModule,
    ],
    templateUrl: './cadastro-item.html',
})
export class CadastroItensComponent {

}
