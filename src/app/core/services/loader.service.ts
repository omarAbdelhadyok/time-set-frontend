import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {

	private _isLoading = false;

	get isLoading() {
		return this._isLoading;
	}

	set isLoading(loading: boolean) {
		this._isLoading = loading;
	}

	constructor() { }
}
