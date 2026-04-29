import { InjectionToken } from '@angular/core';

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

export interface ModalOptions<D = any> {
  data?: D;
  width?: string;
  height?: string;
  disableClose?: boolean;
}
