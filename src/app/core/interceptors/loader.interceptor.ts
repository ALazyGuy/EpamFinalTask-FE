import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/app.reducer';
import { SetIsLoadingAction } from 'src/app/actions/app.actions';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new SetIsLoadingAction(true));

    return next.handle(req)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.store.dispatch(new SetIsLoadingAction(false));
            }
          },
          (error: HttpErrorResponse) => {
            this.store.dispatch(new SetIsLoadingAction(false));
          }
        )
      );
  }
}
