import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    let authService : AuthService = inject(AuthService);
    const authToken = authService.getToken();
    const router = inject(Router);
    const toastr = inject(ToastrService);

    const authReq = req.clone({
    setHeaders: {
        Authorization: `Bearer ${authToken}`
    }
    });

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                toastr.error('Vous devez vous reconnecter pour continuer.', 'Session expirée');
                authService.logout();
                router.navigate(['/login']);
            }
            return throwError(() => new Error(error.message));
        })
    );
};