import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, NotifierService } from 'src/app/core/services';
import { SignInCredentials, SignInResponse } from 'src/app/auth/shared';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

	signInForm: FormGroup;
	isLoading: boolean = false;

	constructor(private fb: FormBuilder,
		private authService: AuthService,
		private notifier: NotifierService,
		private router: Router) { }

	ngOnInit(): void {
		this.createForm();
	}

	createForm(): void {
		this.signInForm = this.fb.group({
			usernameOrEmail: ['', [Validators.required, Validators.maxLength(15)]],
			password: ['', [Validators.required, Validators.maxLength(100)]]
		})
	}

	signIn() {
		if(this.signInForm.invalid) {
			this.notifier.errorMessage('errors.fillForm');
			return;
		}
		this.isLoading = true;
		let credentials = new SignInCredentials(this.signInForm.value);
		this.authService.signIn(credentials).subscribe((signInToken: SignInResponse) => {
			this.isLoading = false;
			this.authService.storeToken(signInToken.accessToken);
			//@ToDo
			//redirect to dashboard / projects page
		}, err => {
			this.isLoading = false;
			this.notifier.errorMessage(err);
		})
	}

}
