import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, map, Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.userIsAdmin().pipe(
      switchMap(user => {
        if (user === undefined || user === null) {
          return of(false);
        }

        if(user) {
          return of(true);
        }

        this.toastr.error("Você precisa ser um admin para ter acesso a está página", 'Ops');
        this.router.navigate(['/']);

        return of(false);
      })
    );
  }
}
