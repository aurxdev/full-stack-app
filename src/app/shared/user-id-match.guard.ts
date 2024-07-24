import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserIdMatchGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public toastr: ToastrService,
    public ticketService: TicketService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {

    // si c'est un support, on autorise l'accès à la page
    if (this.authService.isSupport()) {
      return of(true);
    }
    // on vérifie que l'id est un nombre
    const idPage = route.params['id'];
    if (!this.isValidId(idPage)) {
      this.toastr.error('Identifiant de ticket invalide.', "Erreur");
      this.router.navigate(['/']);
      return of(false);
    }
    const idUser = this.authService.getId() as string;
    // on vérifie que l'utilisateur est bien le propriétaire du ticket
    return this.ticketService.verifyTicket(idPage, idUser).pipe(
      map(isAuthorized => {
        if (!isAuthorized) {
          this.toastr.error('Vous n\'êtes pas autorisé à accéder à cette page.', "Erreur");
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),
      catchError(error => {
        this.toastr.error('Une erreur est survenue.', "Erreur");
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }

  private isValidId(id: string | null): boolean {
    return id !== null && !isNaN(Number(id));
  }
}