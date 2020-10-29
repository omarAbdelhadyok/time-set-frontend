import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { SpinnerOverlayService } from '../services';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

	constructor(private readonly spinnerOverlayService: SpinnerOverlayService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		//show loader only for get requests
		if (request.method === "GET") {
			const spinnerSubscription: Subscription = this.spinnerOverlayService.spinner$.subscribe();
    		return next.handle(request).pipe(finalize(() => spinnerSubscription.unsubscribe()));
		}
		return next.handle(request);
	}
}
