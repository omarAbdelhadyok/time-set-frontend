import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class FormUtilityService {

	constructor() { }

	isFormEmpty(form: FormGroup): boolean {
		let isFormEmpty = true;
		if (form.value) {
			for (let key in form.value) {
				if (form.value[key]) {
					isFormEmpty = false;
				}
			}
		}
		return isFormEmpty;
	}
}
