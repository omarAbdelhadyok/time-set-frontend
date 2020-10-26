import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '../../enums';

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
	
	@Input() appearance: string = MatFormFieldAppearance.LEGACY;
	@Input() type: string;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() formControlName: string;
	@Input() hideErrors: boolean = false;

	/* get hold of FormControl instance no matter formControl or formControlName is given. If formControlName is given, then this.controlContainer.control is the parent FormGroup (or FormArray) instance. */
	get control() {
		return this.controlContainer.control.get(this.formControlName);
	}

	constructor(public controlContainer: ControlContainer) {}

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
		return this.control.errors && this.checkDirty();
	}
	checkRequired() {
		return this.control.errors?.required && this.checkDirty();
	}
	checkMinLength() {
		return this.control.errors?.minlength && this.checkDirty();
	}
	checkMaxLength() {
		return this.control.errors?.maxlength && this.checkDirty();
	}
	checkMin() {
		return this.control.errors?.min && this.checkDirty();
	}
	checkMax() {
		return this.control.errors?.max && this.checkDirty();
	}
	checkNotMatching() {
		return this.control.errors?.notmatching && this.checkDirty();
	}
	
	//check matching password
	checkDirty() {
		return this.control.dirty && this.control.touched;
	}

	log() {
		console.log(this.control.errors)
	}

}
