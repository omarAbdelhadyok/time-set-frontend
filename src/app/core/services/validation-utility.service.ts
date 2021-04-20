import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NotifierService } from './notifier.service';

@Injectable({
	providedIn: 'root'
})
export class ValidationUtilityService {

	constructor(private notifier: NotifierService) { }


	public validateForm(form: FormGroup | AbstractControl) {
		if(form.invalid) {
			this.notifier.errorMessage('errors.fillForm');
			return;
		}
	}

}
