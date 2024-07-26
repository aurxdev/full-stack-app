import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
 
@Injectable({
  providedIn: 'root'
})
export class SupportGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public toastr: ToastrService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isSupport()) { // si l'utilisateur n'est pas support
      this.toastr.error('Vous n\'êtes pas autorisé à accéder à cette page.', "Erreur");
      this.router.navigate(['/'])
    }
    return true;
  }
   
}