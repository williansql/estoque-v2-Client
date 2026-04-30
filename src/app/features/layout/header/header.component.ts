import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from "../layout.service";
import { CommonModule } from "@angular/common";
import { AuthService } from "@/core/auth/auth.service";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule
    ],
    templateUrl: './header.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    protected layoutService = inject(LayoutService);
    private readonly authService = inject(AuthService);

    toggleSidebar() {
        this.layoutService.toggleSidebar();
    }

    logout() {
        this.authService.logout();
    }
}