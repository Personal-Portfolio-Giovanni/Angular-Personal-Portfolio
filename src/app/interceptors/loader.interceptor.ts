import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnimationsService } from '../shared/services/config/animation.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private animation: AnimationsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return (
      next
        .handle(request)
        //.pipe(finalize(() => setTimeout(() => this.loaderService.hide(), 5000)));
        .pipe(
          tap(
            async (event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                setTimeout(() => (this.animation.isLoading = true), 500);
              }
            },
            (err: any) => {
              setTimeout(() => (this.animation.isLoading = false), 500);
            }
          )
        )
    );
  }
}
