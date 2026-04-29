import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * Signal indicating if the current viewport is mobile (width < 1024px).
   */
  isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 1023px)').pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  /**
   * Signal indicating if the sidebar is collapsed.
   * On desktop: collapsed means narrow (icons only).
   * On mobile: collapsed means hidden.
   */
  isSidebarCollapsed = signal(false);

  constructor() {
    // Automatically collapse sidebar when switching to mobile
    effect(() => {
      if (this.isMobile()) {
        this.isSidebarCollapsed.set(true);
      } else {
        this.isSidebarCollapsed.set(false);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarCollapsed.update((v) => !v);
  }

  closeSidebar() {
    this.isSidebarCollapsed.set(true);
  }

  openSidebar() {
    this.isSidebarCollapsed.set(false);
  }
}
