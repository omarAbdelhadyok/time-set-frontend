import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class NotifierService {

	constructor() { }

	successMessage(messageKey: string): void {
		console.log(messageKey)
	}

	infoMessage(messageKey: string): void {
		console.log(messageKey)
	}

	warnMessage(messageKey: string): void {
		console.log(messageKey)
	}

	errorMessage(messageKey: string): void {
		console.log(messageKey)
	}
}
