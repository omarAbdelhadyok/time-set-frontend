import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private baseUrl = environment.baseUrl + '/auth';

	constructor(private http: HttpClient) { }


	login(login) {
		let url = this.baseUrl + '/signin';
		return this.http.post(url, login);
	}
}
