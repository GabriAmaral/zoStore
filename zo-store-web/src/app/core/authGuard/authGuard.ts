import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.userLogado().pipe(
      switchMap(user => {
        if(user) {
          return of(true);
        }

        this.toastr.error("Você precisa estar logado para ter acesso a está página", 'Ops');
        this.router.navigate(['/login']);

        return of(false);
      }))
  }
}
