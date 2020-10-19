import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.authService.getToken()}`
			}
		});

		return next.handle(request);
	}
}
