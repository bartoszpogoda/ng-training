import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizedRoute, Role } from './model/authorized-route';
import { AuthorizationService } from './authorization.service';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

    constructor(private readonly router: Router,
        private readonly authorizationService: AuthorizationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean | UrlTree> | boolean | UrlTree {
        const routeConfig = route.routeConfig as AuthorizedRoute<Role>;

        if (routeConfig && routeConfig.permitAll) {
            return true;
        } else {
            const requiredRole = routeConfig.accessAllowedTo;
            if (requiredRole) {
                return this.authorizationService.isAccessAllowedTo(requiredRole)
                    .pipe(map(isAuthorized => isAuthorized ? isAuthorized : this.router.parseUrl('/access-denied')));
            }
        }

        return this.router.parseUrl('/access-denied');
    }

}