import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'src/app/core/services';
import { SignInCredentials, SignInResponse } from '../../models';
import { AuthService } from '../../services';

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
		private notifier: NotifierService) { }

	ngOnInit(): void {
		this.createForm();
	}

	createForm(): void {
		this.signInForm = this.fb.group({
			usernameOrEmail: ['', [Validators.required, Validators.minLength(20)]],
			password: ['', Validators.required]
		})
	}

	signIn() {
		if(this.signInForm.invalid) {
			this.notifier.errorMessage('errors.fillForm');
			return;
		}
		console.log(this.signInForm)
		// this.isLoading = true;
		// let credentials = new SignInCredentials(this.signInForm.value);
		// this.authService.signIn(credentials).subscribe((signInToken: SignInResponse) => {
		// 	this.isLoading = false;
		// 	this.authService.storeToken(signInToken.accessToken);
		// }, err => {
		// 	this.isLoading = false;
		// 	this.notifier.errorMessage(err);
		// })
	}

}
