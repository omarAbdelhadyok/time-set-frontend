import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInCredentials, SignInResponse } from 'src/app/auth/shared';
import { User } from 'src/app/user/models';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private baseUrl = environment.baseUrl + '/auth';
	private tokenKey = 'token';

	constructor(private http: HttpClient) { }


	signIn(signInCredentials: SignInCredentials): Observable<SignInResponse> {
		let url = this.baseUrl + '/signin';
		return this.http.post<SignInResponse>(url, signInCredentials);
	}

	register(user: User): Observable<SignInResponse> {
		let url = this.baseUrl + '/signup';
		return this.http.post<SignInResponse>(url, user);
	}

	isLoggedIn() {
		return this.getToken() ? true : false;
	}

	storeToken(token: string): void {
		localStorage.setItem(this.tokenKey, token);
	}

	getToken(): string {
		return localStorage.getItem(this.tokenKey);
	}
}
