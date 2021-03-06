import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
	providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

	constructor(private authService: AuthService,
		private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if(this.authService.isLoggedIn()) {
			this.router.navigate(["/home"]);
			return false;
		}
		return true;
	}

}
