import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { FormSubmitBtnComponent, AppInputComponent, AppSpinnerComponent } from './components';
import { AppModalComponent } from './components/app-modal/app-modal.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}  

const MODULES = [ReactiveFormsModule];
const COMPONENTS = [FormSubmitBtnComponent, AppInputComponent, AppSpinnerComponent, AppModalComponent];

@NgModule({
	declarations: [...COMPONENTS],
	imports: [
		CommonModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			},
			isolate: false
		}),
	  	...MODULES
	],
	exports: [...MODULES, ...COMPONENTS, TranslateModule]
})
export class SharedModule { }
