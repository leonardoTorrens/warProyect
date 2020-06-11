import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): UrlTree | boolean | Promise<UrlTree | boolean> | Observable<UrlTree | boolean>{
        return this.authService.user.pipe(take(1),map(user=>{
            const isAuth = !!user;
            if(isAuth){
                return isAuth;
            } else {
                return this.router.createUrlTree(['/auth']);
            }
        }));
    }
    
}