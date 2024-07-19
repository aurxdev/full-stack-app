import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./services/auth.service";

// ceci nous permet d'injecter le jeton JWT dans l'en-tête de chaque requête HTTP sortantes

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}