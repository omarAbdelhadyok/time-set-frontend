import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MaterialModule } from '../material/material.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { SpinnerOverlayComponent } from './components';
import { SpinnerInterceptor } from './interceptors';

@NgModule({
	declarations: [
		SpinnerOverlayComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		OverlayModule
	],
	exports: [
		HttpClientModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: SpinnerInterceptor,
			multi: true
		}
	]
})
export class CoreModule {

	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only');
		}
	}
}
