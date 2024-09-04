import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { AnimationsService } from '../shared/services/config/animation.service';
import { LOG } from '../shared/services/config/logger.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private animation: AnimationsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Inizia l'animazione di caricamento
    this.animation.isLoading = true;

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // Se la richiesta ha successo e ricevi una risposta
        if (event instanceof HttpResponse) {
          setTimeout(() => (this.animation.isLoading = false), 500); // Ferma l'animazione
        }
        return event;
      }),
      catchError((error: any) => {
        // Log dell'errore
        LOG.info(error, 'LoaderInterceptor');

        // Ferma l'animazione in caso di errore
        setTimeout(() => (this.animation.isLoading = false), 500);

        // Propaga l'errore per ulteriori gestioni
        return throwError(() => error);
      }),
      finalize(() => {
        // Garantisce che l'animazione venga fermata anche in caso di successo o fallimento
        if (!this.animation.isLoading) {
          this.animation.isLoading = false;
        }
      })
    );
  }
}
