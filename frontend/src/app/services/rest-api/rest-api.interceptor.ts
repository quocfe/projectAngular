import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ExpiredTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
      },
    });

    return next.handle(clonedRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          // this.authService.refreshToken().then((data: any) => {
          //   localStorage.setItem('token', data.accessToken);
          //   return next.handle(
          //     request.clone({
          //       setHeaders: {
          //         Authorization: `Bearer ${data.accessToken}`,
          //       },
          //     })
          //   );
          // });
        }
        return throwError(() => err);
      })
    );
  }
}
