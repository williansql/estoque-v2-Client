import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardFormFieldComponent } from "@/shared/components/form";
import { ZardInputDirective } from "@/shared/components/input";
import { ZardInputGroupComponent } from "@/shared/components/input-group";
import { ZardTooltipDirective } from "@/shared/components/tooltip";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideEye, lucideEyeOff } from "@ng-icons/lucide";
import { toast } from "ngx-sonner";
import { AuthService } from "../auth.service";
import { AuthLoginDto } from "../dto/auth.dto";
import { ZardDividerComponent } from "@/shared/components/divider";

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    imports: [
        ZardCardComponent,
        ZardFormFieldComponent,
        ZardInputDirective,
        ZardButtonComponent,
        ReactiveFormsModule,
        ZardInputGroupComponent,
        NgIcon,
    ],
    viewProviders: [
        provideIcons({
            lucideEye,
            lucideEyeOff
        })
    ]
})
export class LoginComponent {

    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    isPasswordVisible: boolean = true;

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
        this.authService.login(this.loginForm.value as AuthLoginDto).subscribe({
            next: (response: any) => {
                this.authService.setToken(response.data.token);
                console.log("Usuário logado: ", response);
                const token = this.authService.decodeToken();
                console.log("Token decodificado: ", token);
                this.router.navigate(['/categorias']);
            },
            error: (error) => {
                toast.error(`Erro ao fazer login: ${error.error.message}`);
            }
        });

    }

}