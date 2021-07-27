import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<boolean>();

  show() {
    this.loaderSubject.next(true);
  }
  
  hide() {
    this.loaderSubject.next(false);
  }

  get loaderState() {
    return this.loaderSubject.asObservable();
  }
}
