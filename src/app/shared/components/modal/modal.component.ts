import { Component, ViewChild, ViewContainerRef, Type, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRef } from './modal-ref';

@Component({
  selector: 'z-modal-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300"
        (click)="onBackdropClick()">
      </div>

      <!-- Modal Card -->
      <div 
        class="relative bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 flex flex-col w-full max-h-[90vh] transform transition-all animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300"
        [style.width]="width"
        [style.maxWidth]="width || '32rem'"
        [style.maxHeight]="height">
        
        <!-- Content Container -->
        <div class="flex-1 overflow-y-auto p-1 scrollbar-thin">
           <ng-container #contentHost></ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ModalContainerComponent {
  @ViewChild('contentHost', { read: ViewContainerRef, static: true }) contentHost!: ViewContainerRef;
  
  modalRef = inject(ModalRef);
  width?: string;
  height?: string;
  disableClose = false;

  onBackdropClick() {
    if (!this.disableClose) {
      this.modalRef.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (!this.disableClose) {
      this.modalRef.close();
    }
  }

  loadComponent<T>(component: Type<T>) {
    return this.contentHost.createComponent(component);
  }
}
