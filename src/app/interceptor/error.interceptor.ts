import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const globalErrorInterceptor: HttpInterceptorFn = 
  (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const toastr = inject(ToastrService);

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side / network error
          message = `Network error: ${error.error.message}`;
        } else {
          // Server-side error
          message = `Failed to load users`;
        }

        toastr.error(message, 'Error');
        console.error('Global HTTP Error:', message);

        return throwError(() => new Error(message));
      })
    );
  };
