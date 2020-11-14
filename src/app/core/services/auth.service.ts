import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignInCredentials, SignInResponse } from 'src/app/auth/shared';
import { User } from 'src/app/user/models';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from "@angular/common";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private baseUrl = environment.baseUrl + '/auth';
	private tokenKey = 'token';


	constructor(@Inject(PLATFORM_ID) private platformId: object, private http: HttpClient, private router: Router) {

	}
	signIn(signInCredentials: SignInCredentials): Observable<SignInResponse> {
		let url = this.baseUrl + '/signin';
		return this.http.post<SignInResponse>(url, signInCredentials);
	}

	register(user: User): Observable<SignInResponse> {
		let url = this.baseUrl + '/signup';
		return this.http.post<SignInResponse>(url, user);
	}

	logout() {
		if (isPlatformBrowser(this.platformId)) {
			localStorage.removeItem(this.tokenKey);
		}
		this.router.navigate(["/auth/sign-in"]);
	}

	isLoggedIn() {
		return this.getToken() ? true : false;
	}

	storeToken(token: string): void {
		if (isPlatformBrowser(this.platformId)) {
			localStorage.setItem(this.tokenKey, token);
		}
	}

	getToken(): string {
		if (isPlatformBrowser(this.platformId)) {
			return localStorage.getItem(this.tokenKey);
		}
	}
}
