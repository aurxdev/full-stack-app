import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    let authService : AuthService = inject(AuthService);
    const authToken = authService.getToken();

    const authReq = req.clone({
    setHeaders: {
        Authorization: `Bearer ${authToken}`
    }
    });

    return next(authReq);
};