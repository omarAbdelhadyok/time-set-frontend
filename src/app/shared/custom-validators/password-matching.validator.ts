import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordMatchingValidator(controlName: string, matchingControlName: string): ValidatorFn {
	return (formGroup: FormGroup): ValidationErrors | null => {
		let control = formGroup.controls[controlName];
      	let matchingControl = formGroup.controls[matchingControlName]
		if (matchingControl.errors && !matchingControl.errors.notmatching) {
			return;
		}
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ notmatching: true });
		} else {
			matchingControl.setErrors(null);
		}
	};
}