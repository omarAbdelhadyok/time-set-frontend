import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/models';
import { environment } from 'src/environments/environment';
import { SignInCredentials, SignInResponse } from '../models';

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

	storeToken(token: string): void {
		localStorage.setItem(this.tokenKey, token);
	}
}
