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
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private maxRetries = 1;

  constructor(
    private loading: LoaderService,
    private snackBar: MatSnackBar
  ) {}

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
            this.openSnackBar(`Error HTTP: ${error.status}`);
          }),
          delayWhen(() => {
            this.openSnackBar("Retrying...");
            return timer(1000);
          }),
          take(this.maxRetries)
        )
      ),
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status >= 400 &&
          error.status < 600
        ) {
          this.openSnackBar(`Error HTTP: ${error.status}`);
          return throwError(
            () =>
              new Error(
                "Something goes wrong when the program makes the request..."
              )
          );
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading.setLoading(false);
      })
    );
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 3000,
      panelClass: ["cafler-snackbar"],
    });
  }
}
