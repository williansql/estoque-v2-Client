import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLinkActive, RouterLink } from "@angular/router";
import { LayoutService } from "../layout.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        RouterLinkActive,
        RouterLink
    ],
    templateUrl: './sidebar.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
    protected layoutService = inject(LayoutService);
}