import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-input',
	templateUrl: './app-input.component.html',
	styleUrls: ['./app-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AppInputComponent),
			multi: true
		}
	]
})
export class AppInputComponent implements ControlValueAccessor {

	@ViewChild(FormControlDirective, { static: true }) formControlDirective: FormControlDirective;
	
	@Input() type: string;
	@Input() placeholder: string;
	@Input() formControlName: string;

	/* get hold of FormControl instance no matter formControl or formControlName is given. If formControlName is given, then this.controlContainer.control is the parent FormGroup (or FormArray) instance. */
	get control() {
		return this.controlContainer.control.get(this.formControlName);
	}

	constructor(public controlContainer: ControlContainer,
		public translate: TranslateService) {}

	registerOnTouched(fn: any): void {
		this.formControlDirective.valueAccessor.registerOnTouched(fn);
	}

	registerOnChange(fn: any): void {
		this.formControlDirective.valueAccessor.registerOnChange(fn);
	}

	writeValue(obj: any): void {
		this.formControlDirective.valueAccessor.writeValue(obj);
	}

	setDisabledState(isDisabled: boolean): void {
		this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
	}


	checkErrors() {
		return this.getControl().errors && this.checkDirtyAndTouched();
	}
	checkRequired() {
		return this.getControl().errors?.required && this.checkDirtyAndTouched();
	}
	checkMinLength() {
		return this.getControl().errors?.minlength && this.checkDirtyAndTouched();
	}
	checkMaxLength() {
		return this.getControl().errors?.maxlength && this.checkDirtyAndTouched();
	}
	checkMin() {
		return this.getControl().errors?.min && this.checkDirtyAndTouched();
	}
	checkMax() {
		return this.getControl().errors?.max && this.checkDirtyAndTouched();
	}
	
	//check matching password

	getControl(): AbstractControl {
		return this.controlContainer.control.get(this.formControlName);
	}
	checkDirtyAndTouched() {
		return this.getControl().dirty && this.getControl().touched;
	}

	log() {
		console.log(this.getControl().errors)
	}

}
