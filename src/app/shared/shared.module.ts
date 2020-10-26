import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { FormSubmitBtnComponent, AppInputComponent, AppSpinnerComponent } from './components';
import { MaterialModule } from '../material/material.module';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}  

const MODULES = [ReactiveFormsModule, MaterialModule];
const COMPONENTS = [FormSubmitBtnComponent, AppInputComponent, AppSpinnerComponent];

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
		...MODULES,
		MaterialModule  
	],
	exports: [...MODULES, ...COMPONENTS, TranslateModule]
})
export class SharedModule { }
