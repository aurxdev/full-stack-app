import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public toastr: ToastrService,
    public ticketService: TicketService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {

    let id = route.params['id'];

    // on vérifie que l'id est un nombre
    if (!this.isValidId(id)) {
      this.toastr.error('Identifiant de ticket invalide.', "Erreur");
      this.router.navigate(['/']);
      return of(false);
    }

    // on récupère le ticket et on vérifie les autorisations
    return this.ticketService.getTicketById(id).pipe(
      switchMap((ticket: Ticket) => {
        if (this.authService.isSupport()) {
          if (Number(ticket.idsupport) === -1 || ticket.idsupport === this.authService.getId()) {
            return of(true);
          }
          else {
            this.toastr.error('Vous n\'êtes pas autorisé à accéder à cette page.', "Erreur");
            this.router.navigate(['/']);
            return of(false);
          }
        } else {
          const idUser = this.authService.getId() as string;
          if (ticket.iduser === idUser) {
            return of(true);
          } else {
            this.toastr.error('Vous n\'êtes pas autorisé à accéder à cette page.', "Erreur");
            this.router.navigate(['/']);
            return of(false);
          }
        }
      }),
      catchError((error: any) => {
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