import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./features/layout/header/header.component";
import { SidebarComponent } from "./features/layout/sidebar/sidebar.component";
import { AuthService } from './core/auth/auth.service';
import { LoginComponent } from "./core/auth/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('estoque-v2');

  readonly authService = inject(AuthService);

  isLoggedIn = computed(() => this.authService.isLoggedIn());

}
