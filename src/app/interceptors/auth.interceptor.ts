import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGES } from '@utils/constants';
import { getLocalStorage } from '@utils/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);
  let authHeader = null;
  let authReq = null;

  const userData = getLocalStorage(LOCAL_STORAGES.USER_DATA);

  if (userData != null) {
    try {
      const token = JSON.parse(userData).accessToken;
      authHeader = `Bearer ${token}`;
    } catch (error) {
      console.error('Error parsing cookie data:', error);
    }
  }

  authReq = authHeader
    ? req.clone({
        setHeaders: {
          Authorization: authHeader,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', err);
          _router.navigateByUrl('/login');
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    }),
  );
};
