import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, NotifierService } from 'src/app/core/services';
import { PasswordMatchingValidator } from 'src/app/shared/custom-validators';
import { User } from 'src/app/user/models';
import { SignInResponse } from 'src/app/auth/shared';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	isLoading: boolean = false;

	constructor(private fb: FormBuilder,
		private authService: AuthService,
		private notifier: NotifierService) { }

	ngOnInit(): void {
		this.createForm();
	}

	createForm(): void {
		this.registerForm = this.fb.group({
			firstName: [''],
			lastName: [''],
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required],
			mobile: ['']
		}, {validators: PasswordMatchingValidator('password', 'confirmPassword')});
	}

	register() {
		if(this.registerForm.invalid) {
			this.notifier.errorMessage('errors.fillForm');
			return;
		}
		this.isLoading = true;
		let user = new User(this.registerForm.value);
		this.authService.register(user).subscribe((signInToken: SignInResponse) => {
			this.isLoading = false;
			this.authService.storeToken(signInToken.accessToken);
		}, err => {
			this.isLoading = false;
			this.notifier.errorMessage(err);
		})
	}

}
