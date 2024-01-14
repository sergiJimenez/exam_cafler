import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError, timer } from "rxjs";
import {
  catchError,
  retryWhen,
  tap,
  delayWhen,
  take,
  finalize,
} from "rxjs/operators";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private maxRetries = 1;
  constructor(private loading: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loading.setLoading(true);

    return next.handle(request).pipe(
      retryWhen((errors) =>
        errors.pipe(
          tap((error) => {
            if (error instanceof HttpErrorResponse && error.status !== 500) {
              throw error;
            }
            alert(`Error HTTP: ${error.status}`);
          }),
          delayWhen(() => {
            alert("Retrying...");
            return timer(1000);
          }),
          take(this.maxRetries)
        )
      ),
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 600) {
          alert(`Error HTTP: ${error.status}`);
          return throwError(
            () => new Error("Ocurrió un error en la solicitud.")
          );
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading.setLoading(false);
      })
    );
  }
}
