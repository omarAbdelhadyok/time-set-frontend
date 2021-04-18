import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AlertTypes } from '../enums';

@Injectable({
	providedIn: 'root'
})
export class NotifierService {

	constructor(private _snackBar: MatSnackBar,
		private _translate: TranslateService) { }

	successMessage(messageKey: string): void {
		console.log(messageKey)
	}

	warn(messageKey: string, actionKey?: string): MatSnackBarRef<any> {
		return this.printMessage(messageKey, AlertTypes.DANGER, actionKey);
	}

	errorMessage(messageKey: string): void {
		console.log(messageKey)
	}

	private printMessage(messageKey: string, type: string, actionKey?: string): MatSnackBarRef<any> {
		let message = this._translate.instant(messageKey);
		let action = actionKey ? this._translate.instant(actionKey) : null;
		return this._snackBar.open(message, action, {
			panelClass: ['white-snackbar', type],
			duration: 4000
		});
	}
}
