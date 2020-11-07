import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, NotifierService } from 'src/app/core/services';
import { PasswordMatchingValidator } from 'src/app/shared/custom-validators';
import { User } from 'src/app/user/models';
import { SignInResponse } from 'src/app/auth/shared';
import { Router } from '@angular/router';

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
		private notifier: NotifierService,
		private router:Router) { }

	ngOnInit(): void {
		this.createForm();
	}

	createForm(): void {
		this.registerForm = this.fb.group({
			firstName: ['',[Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
			lastName: ['',[Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
			username: ['', [Validators.required, Validators.maxLength(15)]],
			email: ['',[ Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{3}$")]],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required],
			mobile: ['', Validators.required]
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
			this.router.navigate(["/"]);

			this.authService.storeToken(signInToken.accessToken);
		}, err => {
			this.isLoading = false;
			this.notifier.errorMessage(err);
		})
	}

}
