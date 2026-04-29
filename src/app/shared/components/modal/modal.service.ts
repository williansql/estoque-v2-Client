import {
  Injectable,
  Type,
  ComponentRef,
  ApplicationRef,
  EnvironmentInjector,
  createComponent,
  inject,
  TemplateRef
} from '@angular/core';
import { ModalRef } from './modal-ref';
import { ModalContainerComponent } from './modal.component';
import { MODAL_DATA, ModalOptions } from './modal.tokens';
import { Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private openModals: ComponentRef<ModalContainerComponent>[] = [];

  /**
   * Opens a component in a modal.
   * @param component The component class to render.
   * @param options Configuration options and data.
   */
  open<T, D = any, R = any>(component: Type<T>, options: ModalOptions<D> = {}): ModalRef<R> {
    // 1. Create the ModalRef first
    let modalRef: ModalRef<R>;
    
    // 2. Define the close function
    const closeFn = (result?: R) => {
      const index = this.openModals.indexOf(containerRef);
      if (index > -1) {
        this.openModals.splice(index, 1);
        this.appRef.detachView(containerRef.hostView);
        containerRef.destroy();
      }
    };

    modalRef = new ModalRef<R>(closeFn);

    // 3. Create a custom injector to provide MODAL_DATA and ModalRef to the component
    const providerInjector = Injector.create({
      providers: [
        { provide: MODAL_DATA, useValue: options.data },
        { provide: ModalRef, useValue: modalRef }
      ],
      parent: this.injector as any
    });

    // 4. Create the container component
    const containerRef = createComponent(ModalContainerComponent, {
      environmentInjector: this.injector,
      elementInjector: providerInjector
    });

    // 5. Configure container
    containerRef.instance.width = options.width;
    containerRef.instance.height = options.height;
    containerRef.instance.disableClose = options.disableClose || false;

    // 6. Load the user's component into the container
    const componentRef = containerRef.instance.loadComponent(component);

    // 7. Attach to ApplicationRef so it renders
    this.appRef.attachView(containerRef.hostView);

    // 8. Append to body
    const domElem = (containerRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.openModals.push(containerRef);

    return modalRef;
  }

  /**
   * Closes all open modals.
   */
  closeAll(): void {
    const modals = [...this.openModals];
    modals.forEach(m => m.instance.modalRef.close());
  }

  /**
   * Closes the most recently opened modal.
   */
  close(): void {
    if (this.openModals.length > 0) {
      this.openModals[this.openModals.length - 1].instance.modalRef.close();
    }
  }
}
