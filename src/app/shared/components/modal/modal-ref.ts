import { Subject, Observable } from 'rxjs';

export class ModalRef<R = any> {
  private readonly _afterClosed = new Subject<R | undefined>();

  constructor(private closeFn: (result?: R) => void) {}

  /**
   * Closes the modal.
   * @param result Optional result to pass back.
   */
  close(result?: R): void {
    this.closeFn(result);
    this._afterClosed.next(result);
    this._afterClosed.complete();
  }

  /**
   * Observable that emits when the modal is closed.
   */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }

  /**
   * Shorthand for subscribe(afterClosed()) to match user's requested syntax.
   */
  subscribe(fn?: (result: R | undefined) => void): any {
    return this.afterClosed().subscribe(fn);
  }
}
