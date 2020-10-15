import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordMatchingValidator(controlName: string, matchingControlName: string): ValidatorFn {
	return (formGroup: FormGroup): ValidationErrors | null => {
		let control = formGroup.controls[controlName];
      	let matchingControl = formGroup.controls[matchingControlName]
		if (matchingControl.errors && !matchingControl.errors.confirmPasswordValidator) {
			return;
		}
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ confirmPasswordValidator: true });
		} else {
			matchingControl.setErrors(null);
		}
	};
}