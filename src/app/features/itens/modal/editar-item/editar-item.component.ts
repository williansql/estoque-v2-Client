import { Component } from "@angular/core";
import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardFormFieldComponent } from "@/shared/components/form";
import { ZardInputDirective } from "@/shared/components/input";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-editar-item',
    imports: [
        ZardButtonComponent,
        ZardCardComponent,
        ZardFormFieldComponent,
        ZardInputDirective,
        ReactiveFormsModule,
    ],
    templateUrl: './editar-item.html',
})
export class EditarItemComponent {

}

