import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { AuthLoginDto } from "../dto/auth.dto";
import { Router } from "@angular/router";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardFormFieldComponent } from "@/shared/components/form";
import { ZardInputDirective } from "@/shared/components/input";
import { ZardButtonComponent } from "@/shared/components/button";

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    imports: [
        ZardCardComponent,
        ZardFormFieldComponent,
        ZardInputDirective,
        ZardButtonComponent,
        ReactiveFormsModule
    ]
})
export class LoginComponent {

    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    loginForm = this.fb.group({
        login: ['', Validators.required],
        password: ['', Validators.required]
    });

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            console.log("Formulário inválido!");

            return;
        }
        this.authService.login(this.loginForm.value as AuthLoginDto).subscribe((response: any) => {
            this.authService.setToken(response.data.token);
            console.log("Usuário logado: ", response);
            const token = this.authService.decodeToken();
            console.log("Token decodificado: ", token);

            this.router.navigate(['/categorias']);
        });
    }

}